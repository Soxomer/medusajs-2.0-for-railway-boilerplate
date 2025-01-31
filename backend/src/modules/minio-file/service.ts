import { AbstractFileProviderService, MedusaError } from '@medusajs/framework/utils';
import { Logger } from '@medusajs/framework/types';
import { 
  ProviderUploadFileDTO,
  ProviderDeleteFileDTO,
  ProviderFileResultDTO,
  ProviderGetFileDTO
} from '@medusajs/framework/types';
import { Client,ClientOptions } from 'minio';
import path from 'path';
import { ulid } from 'ulid';

type InjectedDependencies = {
  logger: Logger
}

interface MinioServiceConfig extends ClientOptions {
  bucket?: string
}


const DEFAULT_BUCKET = 'medusa-media'

/**
 * Service to handle file storage using MinIO.
 */
export default class MinioFileProviderService extends AbstractFileProviderService {
  static identifier = 'minio-file'
  protected readonly bucket: string
  protected readonly config_: MinioServiceConfig
  protected readonly logger_: Logger
  protected client_: Client

  constructor({ logger }: InjectedDependencies, options: MinioServiceConfig) {
    if (!options) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'No options provided for MinioFileProviderService')
    }

    super()
    this.logger_ = logger
    this.config_ = options

    // Use provided bucket or default
    this.bucket = this.config_.bucket ?? DEFAULT_BUCKET
    this.logger_.info(`MinIO service initialized with bucket: ${this.bucket}`)

    // Initialize Minio client with hardcoded SSL settings
    this.client_ = new Client({
      endPoint: this.config_.endPoint,
      port: this.config_.port,
      useSSL: this.config_.useSSL,
      accessKey: this.config_.accessKey,
      secretKey: this.config_.secretKey
    })

    // Initialize bucket and policy
    this.initBucket().catch(error => {
      this.logger_.error(`Failed to initialize MinIO bucket: ${error.message}`)
    })
  }

  static validateOptions(options: Record<string, any>) {
    const requiredFields = [
      'endPoint',
      'port',
      'accessKey',
      'secretKey'
    ]

    requiredFields.forEach((field) => {
      if (!options[field]) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${field} is required in the provider's options`
        )
      }
    })
  }

  protected async initBucket(): Promise<void> {
    const bucketName = this.config_.bucket || DEFAULT_BUCKET
    console.log(`Attempting to initialize bucket: ${bucketName}`)
    try {
      const exists = await this.client_.bucketExists(bucketName)
      this.logger_.info(`Bucket exists skip creation`)
      if (!exists) {
        this.logger_.info(`Creating bucket: ${bucketName}`)
        await this.client_.makeBucket(bucketName)
        this.logger_.info(`Setting bucket policy for: ${bucketName}`)
        await this.setBucketPolicy(bucketName)
      } else {
        this.logger_.info(`Using existing bucket: ${bucketName}`)
        
        // Verify/update policy on existing bucket
        try {
          await this.setBucketPolicy(bucketName)
          this.logger_.info(`Updated public read policy for existing bucket: ${bucketName}`)
        } catch (policyError) {
          this.logger_.warn(`Failed to update policy for existing bucket: ${policyError.message}`)
        }
      }
    } catch (error) {
      console.error(`MinIO error details:`, error)
      throw new Error(`Failed to initialize MinIO bucket: ${error.message}`)
    }
  }

  protected async setBucketPolicy(bucketName: string): Promise<void> {
    try {
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicRead',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`]
          }
        ]
      }
      await this.client_.setBucketPolicy(bucketName, JSON.stringify(policy))
    } catch (error) {
      throw new Error(`Failed to set bucket policy: ${error.message}`)
    }
  }

  async upload(
    file: ProviderUploadFileDTO
  ): Promise<ProviderFileResultDTO> {
    if (!file) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file provided'
      )
    }

    if (!file.filename) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No filename provided'
      )
    }

    try {
      const parsedFilename = path.parse(file.filename)
      const fileKey = `${parsedFilename.name}-${ulid()}${parsedFilename.ext}`
      const content = Buffer.from(file.content, 'binary')

      // Upload file with public-read access
      await this.client_.putObject(
        this.bucket,
        fileKey,
        content,
        content.length,
        {
          'Content-Type': file.mimeType,
          'x-amz-meta-original-filename': file.filename,
          'x-amz-acl': 'public-read'
        }
      )

      // Generate URL using the endpoint and bucket
      const url = `https://${this.config_.endPoint}/${this.bucket}/${fileKey}`

      this.logger_.info(`Successfully uploaded file ${fileKey} to MinIO bucket ${this.bucket}`)

      return {
        url,
        key: fileKey
      }
    } catch (error) {
      this.logger_.error(`Failed to upload file: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to upload file: ${error.message}`
      )
    }
  }

  async delete(
    fileData: ProviderDeleteFileDTO
  ): Promise<void> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      await this.client_.removeObject(this.bucket, fileData.fileKey)
      this.logger_.info(`Successfully deleted file ${fileData.fileKey} from MinIO bucket ${this.bucket}`)
    } catch (error) {
      // Log error but don't throw if file doesn't exist
      this.logger_.warn(`Failed to delete file ${fileData.fileKey}: ${error.message}`)
    }
  }

  async getPresignedDownloadUrl(
    fileData: ProviderGetFileDTO
  ): Promise<string> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      const url = await this.client_.presignedGetObject(
        this.bucket,
        fileData.fileKey,
        24 * 60 * 60 // URL expires in 24 hours
      )
      this.logger_.info(`Generated presigned URL for file ${fileData.fileKey}`)
      return url
    } catch (error) {
      this.logger_.error(`Failed to generate presigned URL: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to generate presigned URL: ${error.message}`
      )
    }
  }
}

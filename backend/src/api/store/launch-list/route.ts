import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { LAUNCH_LIST_MODULE } from "../../../modules/launch-list"
import LaunchListService from "../../../modules/launch-list/service"
import { log } from "console"

type LaunchListBody = {
  email: string
  name?: string
  user_type: "artist" | "collector" | "both"
  link?: string
  phone?: string
}

export async function POST(
  req: MedusaRequest<LaunchListBody>,
  res: MedusaResponse
): Promise<void> {
  const launchListService: LaunchListService = req.scope.resolve(
    LAUNCH_LIST_MODULE
  )

  const { email, name, link, user_type } = req.body

  try {
    const entry = await launchListService.createLaunchLists({
      email,
      name,
      link,
      user_type,
    })

    res.json({
      launch_list: entry,
    })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      message: "Failed to join launch list",
      error: error.message,
    })
  }
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const launchListService: LaunchListService = req.scope.resolve(
    LAUNCH_LIST_MODULE
  )

  try {
    const entries = await launchListService.listLaunchLists()

    res.json({
      launch_list: entries,
    })
  } catch (error) {
    res.status(400).json({
      message: "Failed to get launch list entries",
      error: error.message,
    })
  }
} 
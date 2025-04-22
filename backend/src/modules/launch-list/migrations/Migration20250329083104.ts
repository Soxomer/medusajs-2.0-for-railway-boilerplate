import { Migration } from '@mikro-orm/migrations';

export class Migration20250329083103 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop table if exists "launch_list" cascade;`);
    this.addSql(`create table if not exists "launch_list" ("id" text not null, "user_type" text check ("user_type" in ('seller', 'buyer')) not null, "email" text not null, "name" text null, "portfolio_link" text null, "phone" text null, "website_link" text null, "other_marketplaces" text null, "features" text null, "test_full_form" jsonb null, "contacted" boolean not null default false, "contacted_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "launch_list_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_launch_list_deleted_at" ON "launch_list" (deleted_at) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_launch_list_email_unique" ON "launch_list" (email) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "launch_list" cascade;`);
  }
}

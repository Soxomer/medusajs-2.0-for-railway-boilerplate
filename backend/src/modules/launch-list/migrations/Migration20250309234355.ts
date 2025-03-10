import { Migration } from '@mikro-orm/migrations';

export class Migration20250309234355 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "launch_list" add column if not exists "user_type" text not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "launch_list" drop column if exists "user_type";`);
  }

}

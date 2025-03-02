import { Migration } from '@mikro-orm/migrations';

export class Migration20250227170834 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "launch_list" add column if not exists "link" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "launch_list" drop column if exists "link";');
  }

}

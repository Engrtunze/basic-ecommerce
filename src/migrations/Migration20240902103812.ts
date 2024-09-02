import { Migration } from '@mikro-orm/migrations';

export class Migration20240902103812 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "last_logged_in" timestamptz null, "password" varchar(255) not null, "is_banned" boolean not null default false, "role" text check ("role" in (\'user\', \'admin\')) not null default \'user\', constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "product" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null, "name" varchar(255) not null, "price" decimal(15,2) not null, "quantity" int not null, "description" varchar(255) not null, "user_id" uuid not null, "status" text check ("status" in (\'Pending\', \'Approved\', \'Disapproved\')) not null, "deleted" boolean not null default false, constraint "product_pkey" primary key ("id"));');

    this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "product" cascade;');
  }

}

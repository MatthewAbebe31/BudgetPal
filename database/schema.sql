set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.

drop schema "public" cascade;

create schema "public";

create table "purchases" (
  "purchaseId"      serial,
  "categoryId"      numeric not null,
  "description"     text    not null,
  "amount"          numeric  not null DEFAULT 0,
  "date"            DATE NOT NULL DEFAULT CURRENT_DATE,
  primary key ("purchaseId")
);

create table "categories" (
  "categoryId"       serial,
  "categoryName"     text     not null,
  "categoryAmount"   numeric  not null,
  "totalSpent"       numeric  not null DEFAULT 0,
  primary key ("categoryId")
);

create table "notes" (
  "noteId"             serial,
  "categoryId"         numeric  not null,
  "category"           text     not null,
  "note"               text     not null,
  "date"            DATE NOT NULL DEFAULT CURRENT_DATE,
  primary key ("noteId")
);

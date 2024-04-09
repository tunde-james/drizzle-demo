import { relations } from 'drizzle-orm';
import {
  bigint,
  bigserial,
  boolean,
  char,
  date,
  decimal,
  doublePrecision,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  smallint,
  text,
  time,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  address: varchar('address', { length: 256 }),
  score: integer('score'),
});

export const userRelations = relations(users, ({ one }) => ({
  profiles: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  bio: varchar('bio', { length: 256 }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});

// export const moodEnum = pgEnum('mood', ['sad', 'ok', 'happy']);

// export const testTable = pgTable('testTable', {
//   id: bigserial('id', { mode: 'bigint' }),
//   qty: bigint('qty', { mode: 'number' }),
//   price: numeric('price', { precision: 7, scale: 2 }),
//   score: doublePrecision('score'),
//   delivered: boolean('delivered'),
//   //   description: text('description'),
//   description: varchar('description', { length: 256 }),
//   name: char('name', { length: 10 }),
//   data: jsonb('data').notNull(),
//   startAt: time('startAt', { withTimezone: false }).defaultNow(),
//   date: date('date', { mode: 'date' }).defaultNow(),
//   mood: moodEnum('mood').default('happy'),
// });

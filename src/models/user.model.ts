import { pgTable,uuid, varchar, text, timestamp} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstname: varchar("first_name",{ length: 55}).notNull(),
  lastname: varchar("last_name", { length: 55}),
  email:varchar({length: 255}).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  createdAt:timestamp("created_at").defaultNow().notNull(),
  updatedAt:timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});
export default users
export type User = typeof users.$inferSelect;   // result of SELECT
export type NewUser = typeof users.$inferInsert; // values for INSERT

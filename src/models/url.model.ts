import { pgTable,uuid, varchar, text, timestamp} from "drizzle-orm/pg-core";
import { usersTable } from "./index.js";

export const urls = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id").references(()=> usersTable.id).notNull(),
  shortCode: varchar("short_code").notNull().unique(),
  targetUrl: text('target_url').notNull(), 
  createdAt:timestamp("created_at").defaultNow().notNull(),
  updatedAt:timestamp("updated_at").$onUpdate(() => new Date()),

});
export default urls
export type Url = typeof urls.$inferSelect;   // result of SELECT
export type NewUrl = typeof urls.$inferInsert; // values for INSERT

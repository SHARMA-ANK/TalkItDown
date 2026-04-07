import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./auth";

export const shiftsTable = pgTable("shifts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  scenarioId: varchar("scenario_id").notNull(),
  won: boolean("won").notNull(),
  scoreEarned: integer("score_earned").notNull(),
  timeSecs: integer("time_secs").notNull(),
  ragePeak: integer("rage_peak").notNull(),
  managerUsed: boolean("manager_used").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Shift = typeof shiftsTable.$inferSelect;
export type InsertShift = typeof shiftsTable.$inferInsert;

import { boolean, integer, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  walletAddress: varchar("wallet_address", { length: 255 }),
  email: varchar("email", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  referralCode: varchar("referral_code", { length: 30 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  description: text("description").notNull(),
  points: integer("points").notNull(),
  type: varchar("type", { length: 30 }).notNull(),
  link: varchar("link", { length: 500 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const taskCompletions = pgTable(
  "task_completions",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    taskId: integer("task_id").notNull().references(() => tasks.id),
    ipAddress: varchar("ip_address", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => ({
    uniqueUserTask: uniqueIndex("task_completion_unique").on(table.userId, table.taskId)
  })
);

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerUserId: integer("referrer_user_id").notNull().references(() => users.id),
  referredUserId: integer("referred_user_id").notNull().references(() => users.id),
  ipAddress: varchar("ip_address", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const points = pgTable("points", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(),
  source: varchar("source", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const suspiciousActivity = pgTable("suspicious_activity", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  ipAddress: varchar("ip_address", { length: 100 }).notNull(),
  action: varchar("action", { length: 80 }).notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export type Task = typeof tasks.$inferSelect;

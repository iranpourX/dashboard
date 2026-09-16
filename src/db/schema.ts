import {sqliteTable, integer, text} from 'drizzle-orm/sqlite-core'
import {relations} from "drizzle-orm"

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    phone: text('phone').unique().notNull(),
    email: text("email").unique(),
    password: text("password"),
    avatar: text("avatar"),
    role: text("role")
        .$type<'super_admin' | 'manager' | 'user'>().default('user').notNull(),
    createdAt: integer("created_at", {
        mode: 'timestamp'
    }).$defaultFn(() => new Date()),
    updated_at: integer("updated_at", {
        mode: 'timestamp'
    }),
    deleted_at: integer("deleted_at", {
        mode: 'timestamp'
    })
})

export const sessions = sqliteTable("sessions", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull()
        .references(() => users.id),
    token: text("token").notNull(),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
    lastActivity: integer("last_activity", {
        mode: "timestamp",
    }).notNull(),
    expiresAt: integer("expires_at", {
        mode: "timestamp",
    }).notNull(),
    createdAt: integer("created_at", {
        mode: "timestamp",
    }).$defaultFn(() => new Date()).notNull(),
})

export const otpCodes = sqliteTable("otp_codes", {
        id: text("id").primaryKey(),
        phone: text("phone").notNull(),
        code: text("code").notNull(),
        expiresAt: integer("expires_at", {
            mode: "timestamp"
        }).notNull(),
        createdAt: integer("created_at", {
            mode: "timestamp"
        }).$defaultFn(() => new Date()).notNull()
    }
)

export const usersRelations = relations(
    users,
    ({many}) => ({
        sessions: many(sessions)
    })
)

export const sessionsRelations = relations(
    sessions,
    ({one}) => ({
        user: one(users, {
            fields: [sessions.userId],
            references: [users.id]
        })
    })
)
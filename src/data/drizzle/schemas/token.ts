import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { tokenType } from './tokenType'

export const token = pgTable('tokens', {
  id: uuid('id').primaryKey(),
  token: text('token').notNull().unique(),
  userId: uuid('user_id').notNull(),
  tokenTypeId: uuid('token_type_id').notNull().references(() => tokenType.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const tokenRelations = relations(token, ({ one }) => ({
  tokenType: one(tokenType, {
    fields: [token.tokenTypeId],
    references: [tokenType.id]
  })
}))
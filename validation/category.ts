import { text, pgTable, uuid } from "drizzle-orm/pg-core";
import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

export const category = pgTable("category", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	name: text("name").notNull(),
});

export const AddCategorySchema = createInsertSchema(category, {
	name: (schema) => schema.name.min(1, { message: "Name is required" }),
}).pick({
	name: true,
});

export type AddCategoryInputs = z.infer<typeof AddCategorySchema>;

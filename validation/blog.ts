import { z } from "zod";

export const AddBlogSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
});

export type AddBlogInputs = z.infer<typeof AddBlogSchema>;

import { z } from "zod";

export const AddVideoSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	link: z.string().min(1, { message: "Link is required" }),
});

export type AddVideoInputs = z.infer<typeof AddVideoSchema>;

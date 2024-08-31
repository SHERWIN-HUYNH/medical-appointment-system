import { z } from "zod";

export const AddTourSchema = z.object({
	image: z.string().min(1, { message: "Image is required" }),
	title: z.string().min(1, { message: "Title is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	duration: z.number().int().min(0, { message: "Duration is required" }),
	price: z.number().int().min(0, { message: "Price is required" }),
	tourType: z.enum(["PackageTour", "DailyTour", "TailorMadeTour"]),
	tourStyleId: z.string().min(1, { message: "Tour style is required" }),
});

export type AddTourInputs = z.infer<typeof AddTourSchema>;

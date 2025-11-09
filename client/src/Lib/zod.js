import z from "zod/v3";

// ✅ Updated Zod validation schema
export const foodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => parseFloat(val) > 0, "Price must be greater than 0"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required"),
});

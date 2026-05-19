import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),

  dob: z.string(),

  email: z.email(),

  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(6),
});

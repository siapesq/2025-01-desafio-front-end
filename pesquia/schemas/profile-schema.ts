import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
});
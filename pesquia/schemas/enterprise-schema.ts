import { z } from 'zod';

export const enterpriseSchema = z.object({
  name: z.string().min(1),
  cnpj: z.string().min(1),
  emailCommercial: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  address: z.string().min(1),
  city: z.string().min(1).optional(),
  cep: z.string().min(1),
});
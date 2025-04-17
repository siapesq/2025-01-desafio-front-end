import { z } from "zod"


export const productSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  sku: z.string().min(3, { message: "Código deve ter pelo menos 3 caracteres" }),
  category: z.string({ required_error: "Selecione uma categoria" }),
  price: z.coerce
    .number({ invalid_type_error: "Preço deve ser um número" })
    .positive({ message: "Preço deve ser maior que zero" }),
  stock: z.coerce
    .number({ invalid_type_error: "Estoque deve ser um número" })
    .int({ message: "Estoque deve ser um número inteiro" })
    .nonnegative({ message: "Estoque não pode ser negativo" }),
  description: z.string().optional(),
  brand: z.string().optional(),
  supplier: z.string().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>
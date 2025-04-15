import { z } from "zod"


export const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
      message: "Digite um email válido.",
    }),
    password: z.string().min(6, {
      message: "A senha deve ter pelo menos 6 caracteres.",
    }),
    confirmPassword: z.string().min(6, {
      message: "A confirmação de senha deve ter pelo menos 6 caracteres.",
    }),
    isBusinessOwner: z.boolean().default(false),
    companyName: z.string().optional(),
    cnpj: z.string().regex(/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/, {
        message: "CNPJ inválido. Use o formato 11222333000181 ou 11.222.333/0001-81."
    }).optional(),
    companyCep: z.string().regex(/^\d{5}-?\d{3}$/, {
        message: "CEP inválido. Use o formato 12345678 ou 12345-678."
    }).optional(),
    companyAddress: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.isBusinessOwner) {
        return !!data.companyName && !!data.cnpj && !!data.companyAddress
      }
      return true
    },
    {
      message: "Campos obrigatórios para cadastro de empresa",
      path: ["companyName"],
    },
  )

export type FormValues = z.infer<typeof formSchema>
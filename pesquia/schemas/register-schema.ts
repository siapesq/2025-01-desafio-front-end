import { z } from "zod"

export const RegisterformSchema = z
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
    cnpj: z.string().optional().superRefine((val, ctx) => {
      if (val && val.length > 0) {
        if (!/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "CNPJ inválido. Use o formato 11222333000181 ou 11.222.333/0001-81."
          });
        }
      }
    }),
    companyCep: z.string().optional().superRefine((val, ctx) => {
      if (val && val.length > 0) {
        if (!/^\d{5}-?\d{3}$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "CEP inválido. Use o formato 12345678 ou 12345-678."
          });
        }
      }
    }),
    companyAddress: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.isBusinessOwner) {
      if (!data.companyName || data.companyName.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nome da empresa é obrigatório",
          path: ['companyName']
        });
      }
      
      if (!data.cnpj || data.cnpj.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CNPJ é obrigatório",
          path: ['cnpj']
        });
      }
      
      if (!data.companyAddress || data.companyAddress.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Endereço da empresa é obrigatório",
          path: ['companyAddress']
        });
      }
      
      if (!data.companyCep || data.companyCep.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CEP da empresa é obrigatório",
          path: ['companyCep']
        });
      }
    }
    return true;
  })

export type RegisterFormValues = z.infer<typeof RegisterformSchema>
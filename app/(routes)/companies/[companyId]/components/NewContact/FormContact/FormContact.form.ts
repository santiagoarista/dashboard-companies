import { z } from 'zod'

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    role: z.string(),
    email: z.string().min(2).max(80),
    phone: z.string().min(6),
})
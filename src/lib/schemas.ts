import { z } from 'zod'

export const subscribeSchema = z.object({
    email: z.string().trim().toLowerCase().email('Унеси исправну имејл адресу.'),
    _website: z.string().optional()
})

export type SubscribeInput = z.infer<typeof subscribeSchema>

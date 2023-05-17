import { z } from 'zod';

const RefreshTokenSchema = z.object({
  id: z.string().uuid(),
  expiresIn: z.number(),
  userId: z.string().uuid()
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;

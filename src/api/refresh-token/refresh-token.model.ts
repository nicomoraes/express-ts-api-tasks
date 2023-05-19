import { z } from 'zod';

export const RefreshTokenSchema = z.object({
  id: z.string().uuid(),
  expiresIn: z.number().int().min(0),
  userId: z.string().uuid()
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
export type RefreshTokenById = Pick<RefreshToken, 'id'>;
export type RefreshTokenByUserId = Pick<RefreshToken, 'userId'>;

import { z } from 'zod';

const USERNAME_MIN_LENGHT = 5;
const USERNAME_MAX_LENGHT = 20;
const PASSWORD_MIN_LENGHT = 8;
const PASSWORD_MAX_LENGHT = 36;

export const UserSchema = z.object({
  id: z.string().uuid({ message: 'UUID inválido' }).optional(),
  username: z
    .string({
      required_error: 'O nome de usuário não pode estar vazio.',
      invalid_type_error: 'O campo deve ser do tipo string'
    })
    .min(USERNAME_MIN_LENGHT, {
      message: `O nome de usuário deve ter no mínimo ${USERNAME_MIN_LENGHT} caracteres.`
    })
    .max(USERNAME_MAX_LENGHT, {
      message: `O nome de usuário deve ter no máximo ${USERNAME_MAX_LENGHT} caracteres.`
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        'O nome de usuário deve ser composto apenas por letras e números.'
    }),
  password: z
    .string({
      required_error: 'A senha não pode estar vazia.',
      invalid_type_error: 'O campo deve ser do tipo string'
    })
    .min(PASSWORD_MIN_LENGHT, {
      message: `A senha deve ter no mínimo ${PASSWORD_MIN_LENGHT} caracteres.`
    })
    .max(PASSWORD_MAX_LENGHT, {
      message: `A senha deve ter no máximo ${PASSWORD_MAX_LENGHT} caracteres.`
    })
});

export const UserAuthSchema = UserSchema.omit({ id: true });

export type UserAuthentication = z.infer<typeof UserAuthSchema>;

// utils
export type UserByUsername = Pick<z.infer<typeof UserSchema>, 'username'>;
export type UserById = Pick<z.infer<typeof UserSchema>, 'id'>;

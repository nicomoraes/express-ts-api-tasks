import { z } from 'zod';

const TITLE_MIN_LENGHT = 3;
const TITLE_MAX_LENGHT = 75;
const DESCRIPTION_MIN_LENGHT = 3;
const DESCRIPTION_MAX_LENGHT = 500;

export const TaskSchema = z.object({
  id: z.string().uuid({ message: 'UUID inválido' }),
  title: z
    .string({
      required_error: 'O título é obrigatório!',
      invalid_type_error: 'O título deve ser do tipo string.'
    })
    .min(TITLE_MIN_LENGHT, {
      message: `O título deve ter no mínimo ${TITLE_MIN_LENGHT} caracteres.`
    })
    .max(TITLE_MAX_LENGHT, {
      message: `O título deve ter no máximo ${TITLE_MAX_LENGHT} caracteres.`
    }),
  description: z
    .string({ invalid_type_error: 'A descrição deve ser do tipo string.' })
    .min(DESCRIPTION_MIN_LENGHT, {
      message: `A descrição deve ter no mínimo ${DESCRIPTION_MIN_LENGHT} caracteres.`
    })
    .max(DESCRIPTION_MAX_LENGHT, {
      message: `A descrição deve ter no máximo ${DESCRIPTION_MAX_LENGHT} caracteres.`
    })
    .optional(),
  userId: z.string().uuid({ message: 'UUID inválido' })
});

export const TaskCreateSchema = TaskSchema.omit({ id: true });

export type TaskCreate = z.infer<typeof TaskCreateSchema>;

// utils
export type TaskById = Pick<z.infer<typeof TaskSchema>, 'id'>;
export type TaskByUserId = Pick<z.infer<typeof TaskSchema>, 'userId'>;

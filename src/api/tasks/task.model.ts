import { z } from 'zod';

const TITLE_MIN_LENGHT = 3;
const TITLE_MAX_LENGHT = 75;
const DESCRIPTION_MIN_LENGHT = 3;
const DESCRIPTION_MAX_LENGHT = 500;

export const TaskSchema = z.object({
  id: z.string().uuid({ message: 'UUID inválido' }),
  title: z
    .string({
      required_error: 'O título é obrigatório.',
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
  due_time: z.string({ required_error: 'A data de vencimento é obrigatória.' }).datetime(),
  userId: z.string().uuid({ message: 'UUID inválido' })
});

export const TaskSchemaUpdate = z.object({
  id: z.string().uuid({ message: 'UUID inválido' }),
  title: z
    .string({
      required_error: 'O título é obrigatório.',
      invalid_type_error: 'O título deve ser do tipo string.'
    })
    .min(TITLE_MIN_LENGHT, {
      message: `O título deve ter no mínimo ${TITLE_MIN_LENGHT} caracteres.`
    })
    .max(TITLE_MAX_LENGHT, {
      message: `O título deve ter no máximo ${TITLE_MAX_LENGHT} caracteres.`
    }).optional(),
  description: z
    .string({ invalid_type_error: 'A descrição deve ser do tipo string.' })
    .min(DESCRIPTION_MIN_LENGHT, {
      message: `A descrição deve ter no mínimo ${DESCRIPTION_MIN_LENGHT} caracteres.`
    })
    .max(DESCRIPTION_MAX_LENGHT, {
      message: `A descrição deve ter no máximo ${DESCRIPTION_MAX_LENGHT} caracteres.`
    })
    .optional(),
  due_time: z.string({ required_error: 'A data de vencimento é obrigatória.' }).datetime().optional(),
  userId: z.string().uuid({ message: 'UUID inválido' })
});

export const TaskCreateSchema = TaskSchema.omit({ id: true });
export const TaskUpdateSchema = TaskSchemaUpdate.omit({ id: true, userId: true });

export type Task = z.infer<typeof TaskSchema>;

export type TaskById = Pick<Task, 'id'>;
export type TaskByUserId = Pick<Task, 'userId'>;

export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type TaskUpdate = Partial<Pick<Task, 'title' | 'description' | 'due_time'>>;

import { z } from 'zod';

const bodySchema = z.object({
  login: z.string(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const { login, password } = await readValidatedBody(event, bodySchema.parse);
});
import { z } from "zod";

export const SignUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  name: z.string().optional(),
});

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type SignUpInputType = z.infer<typeof SignUpInput>;
export type LoginInputType = z.infer<typeof LoginInput>;
export type CreatePostInputType = z.infer<typeof createPostInput>;
export type UpdatePostInputType = z.infer<typeof updatePostInput>;

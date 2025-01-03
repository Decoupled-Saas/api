import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import zxcvbn from "zxcvbn";

extendZodWithOpenApi(z);

export const AuthRegisterSchema = z.object({
  id: z.string().uuid().openapi({ example: "c58cef4e-bfae-4fce-b41d-642a905dc5c3" }),
  email: z.string().email().openapi({ example: "jane.doe@here.com" }),
  first_name: z.string().openapi({ example: "jane" }),
  last_name: z.string().openapi({ example: "doe" }),
  active: z.boolean().default(true),
  createdAt: z.date().openapi({ example: "2025-01-01T00:00:00.000Z" }),
  updatedAt: z.date().openapi({ example: "2025-01-01T00:00:00.000Z" }),
});

export const AuthRegisterInputSchema = z.object({
  email: z.string().email().openapi({ example: "jane.doe@here.com" }),
  first_name: z.string().openapi({ example: "jane" }),
  last_name: z.string().openapi({ example: "doe" }),
  password: z.string().min(8).openapi({ example: "Sup3rS3cr3tP@55w0rd" }),
});

export const AuthLoginInputSchema = z.object({
  email: z.string().email().openapi({ example: "jane.doe@here.com" }),
  password: z.string().min(8).openapi({ example: "Sup3rS3cr3tP@55w0rd" }),
});

export const AuthLoginPostSchema = z.object({
  body: z.object({
    email: z.string().email().openapi({ example: "jane.doe@here.com" }),
    password: z
      .string()
      .min(8)
      .openapi({ example: "Sup3rS3cr3tP@55w0rd" })
      .refine((data) => {
        const { score } = zxcvbn(data);
        if (score < 2) {
          return false;
        }
        return data;
      }),
  }),
});

export const AuthRegisterPostSchema = z.object({
  body: z.object({
    email: z.string().email().openapi({ example: "jane.doe@here.com" }),
    password: z
      .string()
      .min(8)
      .openapi({ example: "Sup3rS3cr3tP@55w0rd" })
      .refine((data) => {
        const { score } = zxcvbn(data);
        if (score < 2) {
          return false;
        }
        return data;
      }),
    first_name: z.string().openapi({ example: "jane" }),
    last_name: z.string().openapi({ example: "doe" }),
  }),
});

export const AuthSchema = z.object({
  user: AuthRegisterSchema,
  tokens: z.object({}),
});

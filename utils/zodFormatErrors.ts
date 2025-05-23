import { ZodError } from "zod";

export function formatZodErrors(error: ZodError) {
  const formatted: Record<string, string> = {};

  error.errors.forEach((err) => {
    if (err.path && err.path.length > 0) {
      const field = err.path[0] as string;
      formatted[field] = err.message;
    }
  });

  return formatted;
}

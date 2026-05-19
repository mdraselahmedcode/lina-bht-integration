// utils/apiError.ts

/**
 * FastAPI can return errors in two shapes:
 *   1. Validation error: { detail: [{type, loc, msg, input, ctx}] }
 *   2. Business error:   { detail: "some string" } or { message: "some string" }
 *
 * This util always returns a plain string safe to pass to showError().
 */
export const extractApiError = (
  error: any,
  fallback = 'Something went wrong. Please try again.'
): string => {
  const data = error?.data;

  if (!data) return fallback;

  // Shape 1: { message: "string" }
  if (typeof data.message === 'string') return data.message;

  // Shape 2a: { detail: "string" }
  if (typeof data.detail === 'string') return data.detail;

  // Shape 2b: { detail: [{msg: "string", loc: [...], ...}] }
  if (Array.isArray(data.detail) && data.detail.length > 0) {
    return data.detail
      .map((d: any) => {
        const field = d?.loc?.slice(-1)?.[0]; // last loc segment = field name
        const msg = d?.msg || 'Invalid value';
        return field ? `${field}: ${msg}` : msg;
      })
      .join('\n');
  }

  return fallback;
};

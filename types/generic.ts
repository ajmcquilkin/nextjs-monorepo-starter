export type Empty = Record<string, never>;

export const isValidObject = (obj: unknown): obj is Record<string, any> => typeof obj === 'object' && !!obj;

export const hasKey = <T extends Record<string, any>>(obj: T, key: string): boolean => key in obj;

export const hasField = <T extends Record<string, any>>(obj: T, key: string, type: string): boolean => {
  if (!hasKey(obj, key)) return false;
  if (typeof obj[key] !== type) return false;
  return true;
};

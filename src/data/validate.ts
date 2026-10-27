import { langs, type Lang } from '../i18n';

export type Text = Record<Lang, string>;

export function check(ok: unknown, file: string, message: string): asserts ok {
  if (!ok) throw new Error(`\n\n✗ ${file}: ${message}\n`);
}

// A text in the three site languages. Only one is required; missing ones fall back
// to English, then Georgian, then Russian.
export function text(value: unknown, file: string, where: string): Text {
  check(value && typeof value === 'object' && !Array.isArray(value), file, `${where} must look like { "ka": "…", "en": "…", "ru": "…" }`);
  const v = value as Record<string, unknown>;
  for (const key of Object.keys(v)) {
    check(langs.includes(key as Lang), file, `${where}: unknown language "${key}" (use "ka", "en" or "ru")`);
    check(typeof v[key] === 'string', file, `${where}.${key} must be text in quotes`);
  }
  const fallback = [v.en, v.ka, v.ru].find((s) => typeof s === 'string' && s.trim()) as string | undefined;
  check(fallback, file, `${where} needs at least one of "ka", "en" or "ru"`);
  return Object.fromEntries(langs.map((l) => [l, ((v[l] as string) || fallback).trim()])) as Text;
}

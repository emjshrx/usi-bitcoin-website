/** Join a public-folder path with Astro `base` (BASE_URL may omit trailing slash). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const p = path.replace(/^\//, "");
  return normalizedBase + p;
}

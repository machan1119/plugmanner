// export function slugify(str: string): string {
//   return str
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-|-$/g, "");
// }

// export function slugify_reverse(slug: string[]): string {
//   return slug.join("-");
// }
export function replace_str(s1: string, s2: string): string {
  s1 = s1.replaceAll(s2, "");
  return s1;
}

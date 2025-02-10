export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugify_reverse(slug: string): string {
  const words = slug.split("-");
  const result = words.map((word, index) => {
    if (index >= 0) {
      if (word == "usa" || word == "nft") return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
  return result.join(" ");
}
export function replace_str(s1: string, s2: string): string {
  s1 = s1.replaceAll(s2, "");
  return s1;
}

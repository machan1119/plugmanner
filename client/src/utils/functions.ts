interface HeaderTextType {
  content: string;
}

export function generate_item_url(str: HeaderTextType[]): string {
  let url = "";
  url = str.map((item) => item.content).join(" ");
  return url
    .toLowerCase()
    .replace(" ", "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace("-x", "");
}

export function generate_item_url_from_name(name: string): string {
  return name
    .toLowerCase()
    .replace(" ", "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace("-x", "");
}

export function generate_name(str: HeaderTextType[]): string {
  let name = "";
  name = str.map((item) => item.content).join(" ");
  name = name.trim();
  return name;
}

export function replace_str(s1: string, s2: string): string {
  let patternsToRemove = [];
  if (s1.startsWith("Twitter"))
    patternsToRemove = [`de ${s2}`, "Comprar", "Compra"];
  else patternsToRemove = [`de ${s2}`, s2, "Comprar", "Compra"];
  let result = patternsToRemove.reduce(
    (currentString, pattern) => currentString.replace(pattern, ""),
    s1.trim()
  );
  result = result.trim();
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

export function format_blog_date(dateString: string): string {
  const date = new Date(dateString);
  // Options for formatting month as full name, day as number, year as number
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function generate_item_url_from_blog_title(title: string) {
  const parts = title.split(/[:.?!,;\-]+/);
  const mainPart = parts[0];
  const words: string[] = mainPart.split(/[^a-zA-Z0-9]+/);
  const filtered = words.filter(Boolean).map((word) => word.toLowerCase());
  return filtered.join("-");
}

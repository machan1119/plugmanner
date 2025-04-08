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
    .replace(/^-|-$/g, "");
}

export function replace_str(s1: string, s2: string): string {
  const patternsToRemove = [`de ${s2}`, s2, "Comprar", "Compra"];
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

export const getCookie = (name: string) => {
  if (typeof document === "undefined") {
    return null;
  }
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

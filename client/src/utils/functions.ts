export function generate_slug(str: string): string {
  str = "buy " + str;
  return str
    .toLowerCase()
    .replace(" ", "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function replace_str(s1: string, s2: string): string {
  s1 = s1.replace(s2, "");
  return s1;
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

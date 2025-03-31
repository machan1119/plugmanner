import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function RootPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  if (localeCookie) {
    const locale = localeCookie.value;
    redirect(`/${locale}`);
  } else {
    redirect("/en");
  }
}

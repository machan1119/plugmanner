import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/utils/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../libs/home_content/${locale}.json`)).default,
  };
});

import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { LanguageOption } from "@/libs/types/Types";

const languages: LanguageOption[] = [
  {
    code: "en",
    flag: "https://cdn.weglot.com/flags/square/us.svg",
    name: "English",
  },
  {
    code: "es-ES",
    flag: "https://cdn.weglot.com/flags/square/es.svg",
    name: "Español",
  },
  {
    code: "de",
    flag: "https://cdn.weglot.com/flags/square/de.svg",
    name: "Deutsch",
  },
  {
    code: "pt-BR",
    flag: "https://cdn.weglot.com/flags/square/br.svg",
    name: "Português",
  },
];

export default function LocaleSwitcher() {
  const locale = useLocale();

  return <LocaleSwitcherSelect defaultValue={locale} items={languages} />;
}

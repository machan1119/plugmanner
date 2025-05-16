import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { LanguageOption } from "@/libs/types/Types";

const languages: LanguageOption[] = [
  {
    code: "en",
    flag: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67e596d5b8d74aa1d10fc078_USflag.png",
    name: "English",
  },
  {
    code: "pt-BR",
    flag: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/68063a1ad222786462ae4b2a_brazil_flag.png",
    name: "Português",
  },
  {
    code: "es-ES",
    flag: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67e596d54547810aa7af0c91_ESflag.png",
    name: "Español",
  },
];

export default function LocaleSwitcher() {
  const locale = useLocale();

  return <LocaleSwitcherSelect defaultValue={locale} items={languages} />;
}

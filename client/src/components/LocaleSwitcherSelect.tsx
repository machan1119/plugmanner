// "use client";

// import { useTransition } from "react";
// import { Locale } from "@/i18n/config";
// import { setUserLocale } from "@/services/locale";

// type Props = {
//   defaultValue: string;
//   items: Array<{ value: string; label: string }>;
//   label: string;
// };

// export default function LocaleSwitcherSelect({
//   defaultValue,
//   items,
//   label,
// }: Props) {
//   const [isPending, startTransition] = useTransition();

//   function onChange(value: string) {
//     const locale = value as Locale;
//     startTransition(() => {
//       setUserLocale(locale);
//     });
//   }

//   return <div className=""></div>;
// }

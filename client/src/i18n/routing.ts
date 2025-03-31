import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es-ES", "de", "pt-BR"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/services": {
      "es-ES": "/servicios",
      de: "/dienstleistungen",
      "pt-BR": "/serviços",
    },
    "/services/[item]": {
      "es-ES": "/servicios/[item]",
      de: "/dienstleistungen/[item]",
      "pt-BR": "/serviços/[item]",
    },
  },
});

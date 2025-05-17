import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es-ES", "de", "pt-BR"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/services": {
      "es-ES": "/servicios",
      "pt-BR": "/serviços",
    },
    "/services/[item]": {
      "es-ES": "/servicios/[item]",
      "pt-BR": "/serviços/[item]",
    },
    "/free-tools": {
      "es-ES": "/herramientas-gratis",
      "pt-BR": "/ferramentas-gratuitas",
    },
    "/free-services/[item]": {
      "es-ES": "/servicios-gratuitos/[item]",
      "pt-BR": "/serviços-gratuitos/[item]",
    },
  },
  localePrefix: "as-needed",
});

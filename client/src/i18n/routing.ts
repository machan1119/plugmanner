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
    "/free-tools": {
      "es-ES": "/herramientas-gratis",
      de: "/kostenlose-tools",
      "pt-BR": "/ferramentas-gratuitas",
    },
    "/free-tools/[item]": {
      "es-ES": "/herramientas-gratis/[item]",
      de: "/kostenlose-tools/[item]",
      "pt-BR": "/ferramentas-gratuitas/[item]",
    },
  },
  localePrefix: "as-needed",
});

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
    "/services/telegram-members": {
      "es-ES": "/servicios/telegram-members-es",
      de: "/dienstleistungen/telegram-members-de",
      "pt-BR": "/serviços/telegram-members-pt",
    },
  },
});

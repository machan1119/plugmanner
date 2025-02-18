import fetchClient from "@/libs/fetch-client";
import { jwt } from "@/libs/utils";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!) || 1209600,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
            {
              identifier: credentials?.email,
              password: credentials?.password,
            }
          );
          if (user.data) {
            return user.data;
          } else {
            return null;
          }
        } catch (error) {
          const errorMessage = error instanceof Error;
          throw new Error(errorMessage + "&email=" + credentials?.email);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session.type === "MANUAL") {
          const response = await fetchClient({
            url: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/user",
            token: token.accessToken,
          });
          const user = await response.json();

          return { ...token, ...user };
        }

        return { ...token, ...session };
      }

      if (user) {
        return { ...token, ...user };
      }

      const { exp: accessTokenExpires } = jwt.decode(token.accessToken);

      if (!accessTokenExpires) {
        return token;
      }

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);
      const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

      if (accessTokenHasExpired) {
        return await refreshAccessToken(token);
      }

      return token;
    },
    // session: async (session, token) => {
    //     session.jwt = token.jwt;
    //     session.user = token.user;
    //     return Promise.resolve(session);
    //   },
    async session({ session, token }) {
      if (token.error) {
        throw new Error("Refresh token has expired");
      }

      session.accessToken = token.accessToken;
      session.user.name = token.name || "";
      session.user.email = token.email || "";
      session.user.email_verified_at = token.email_verified_at;

      return session;
    },
  },
  events: {
    async signOut({ token }) {
      await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/logout",
        token: token.accessToken,
      });
    },
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/refresh",
      token: token.accessToken,
    });

    if (!response.ok) throw response;

    const refreshedAccessToken: { access_token: string } =
      await response.json();
    const { exp } = jwt.decode(refreshedAccessToken.access_token);

    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      exp,
    };
  } catch (error) {
    console.error("Error", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

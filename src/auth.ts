import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { db } from "./lib/db";
import { slugify } from "./lib/utils";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google,
  Resend({
    from: "quizy@quizymania.pl",
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers,
  events: {
    createUser: async (message) => {
      const slug = slugify("użytkownik");
      await db.user.update({
        where: { id: message.user.id },
        data: { slug },
      });
    },
  },
  pages: {
    signIn: "/signIn",
    signOut: "/signOut",
  },
});

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

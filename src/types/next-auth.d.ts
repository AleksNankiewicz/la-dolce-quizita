import { DefaultSession } from "next-auth";
import { User as PrismaUser } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User extends PrismaUser {}
}

import { redirect } from "next/navigation";

import { AuthError } from "next-auth";
import { providerMap, signIn } from "@/auth";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SignInPage() {
  return (
    <Card className="mx-auto mt-[140px] max-w-sm">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-2xl">Quizymania</CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div> */}
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, { redirectTo: "/" });
                } catch (error) {
                  throw error;
                }
              }}
            >
              <Button variant="outline" className="w-full">
                <span>Zaloguj się przez {provider.name}</span>
              </Button>
            </form>
          ))}
        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}

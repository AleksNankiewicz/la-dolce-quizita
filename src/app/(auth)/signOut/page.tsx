import { signOut } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignOutPage() {
  return (
    <div className="min-h-[90vh] bg-background">
      <Card className="mx-auto mt-[140px] max-w-sm">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl">Wyloguj się</CardTitle>
          <CardDescription>Czy na pewno chcesz nasz opuścić?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form
              action={async (formData) => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant={"outline"} type="submit" className="w-full">
                Wyloguj się
              </Button>
              {/* <button type="submit">Sign out</button> */}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

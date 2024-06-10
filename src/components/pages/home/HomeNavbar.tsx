// import Link from "next/link";
// import React from "react";
// import { Plus, Sparkles, SquarePen, User } from "lucide-react";
// import { cn } from "@/lib/utils";
// import NavigationDropdown, {
//   TSubHeader,
// } from "@/components/ui/NavigationDropdown";
// import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

// import HomeSheet from "./HomeSheet";

// import { auth, signIn, signOut } from "@/auth";
// import { Button } from "@/components/ui/button";

// const profileSubHeaders: TSubHeader[] = [
//   {
//     title: "Profil",
//     href: "/profile",
//   },
//   {
//     title: "Biblioteka",
//     href: "/profile",
//   },
//   {
//     title: "Ustawienia",
//     href: "/profile",
//   },
// ];
// const createQuizSubHeaders: TSubHeader[] = [
//   {
//     title: "Kreator quizów",
//     href: "/editQuiz/newQuiz",
//     icon: <SquarePen size={15} />,
//   },
//   {
//     title: "Generuj quiz z AI ",
//     href: "/editAiQuiz/newQuiz",
//     icon: <Sparkles size={15} />,
//   },
// ];

// const HomeNavbar = async () => {
//   const session = await auth();

//   const user = session?.user;

//   return (
//     <Navbar>
//       <h1 className="text-2xl font-bold">Quizymania</h1>

//       <div className="hidden gap-4 md:flex">
//         <ThemeSwitcher />

//         <NavigationDropdown
//           position="right"
//           trigger={
//             <Link href={"/editQuiz/newQuiz"} className={cn("flex gap-2")}>
//               Stwórz Quiz <Plus size={18} />
//             </Link>
//           }
//           subHeaders={createQuizSubHeaders}
//         />

//         {/* <NavigationDropdown trigger={<User />} subHeaders={profileSubHeaders} /> */}

//         {!user && (
//           <form
//             action={async () => {
//               "use server";
//               await signIn();
//             }}
//           >
//             <Button type="submit" variant={"default"}>
//               Zaloguj się
//             </Button>
//           </form>
//         )}
//         {user && (
//           <form
//             action={async () => {
//               "use server";
//               await signOut();
//             }}
//           >
//             <Button type="submit" variant={"outline"}>
//               Wyloguj się
//             </Button>
//           </form>
//         )}
//         <HomeSheet userSlug={user?.slug} />
//       </div>
//     </Navbar>
//   );
// };

// export default HomeNavbar;

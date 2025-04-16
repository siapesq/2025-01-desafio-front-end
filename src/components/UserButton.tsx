"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="top-0 left-0 w-full z-50 bg-white shadow-md mb-0.5">
      <div className="flex items-center justify-between px-4 py-2 md:px-8">
        <div className="flex-shrink-0">
          <Link href="/home-layout">
            <img
              src="pkm.png"
              alt="Pokémon Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div>
          {session && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex gap-4 items-center">
                  {/* Oculta o texto em telas pequenas */}
                  <span className="font-poppins font-bold text-[#305e9f] hidden sm:inline whitespace-nowrap">
                    Olá, {session.user?.name?.toUpperCase()}
                  </span>
                  <Avatar className="size-10 hover:opacity-75 transition cursor-pointer">
                    <AvatarImage src={session.user?.image || undefined} />
                    <AvatarFallback className="bg-sky-900 text-white">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" side="bottom" className="w-50">
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserButton;

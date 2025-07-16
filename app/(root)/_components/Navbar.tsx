"use client";

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Laptop } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <nav className="w-full p-2 flex justify-between items-center">
      {/* Logo */}
      <Link
        href="/"
        className="flex select-none items-center w-fit gap-2 ml-4 md:ml-8"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          priority
          height={40}
          className="w-auto h-auto"
        />
        <div className="lg:flex flex-col hidden">
          <span className="font-semibold hidden sm:block">Editing</span>
          <span className="font-semibold hidden sm:block">Blocks</span>
        </div>
      </Link>

      {/* Search */}
      <div className="max-w-xl w-full px-4">
        <SearchInput />
      </div>

      {/* Theme Switcher */}
      <div className="mr-4 flex gap-3 justify-center items-center">
        {/* Users Profile Component to add further */}
        <UserButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:hidden" />
              <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="w-4 h-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Laptop className="w-4 h-4 mr-2" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;

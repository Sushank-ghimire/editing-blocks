"use client";

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Navbar = () => {
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
        <div className="md:flex justify-center hidden items-center gap-4">
          <OrganizationSwitcher
            afterLeaveOrganizationUrl="/"
            afterCreateOrganizationUrl={"/"}
            afterSelectOrganizationUrl={"/"}
            afterSelectPersonalUrl={"/"}
          />
        </div>
        <UserButton />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;

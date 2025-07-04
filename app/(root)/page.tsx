"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const Home = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };
  return (
    <div className="flex justify-center flex-col gap-4 items-center min-h-screen w-screen">
      <Button onClick={handleThemeChange}>Change Theme</Button>
      <Link href={"/sign-up"}>Signup</Link>
      <Link href={"/documents/document-id-goes-here"}>Documents</Link>
    </div>
  );
};

export default Home;

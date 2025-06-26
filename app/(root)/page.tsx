"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center flex-col gap-4 items-center min-h-screen w-screen">
      <Button>Button</Button>
      <Link href={"/sign-up"}>Signup</Link>
    </div>
  );
};

export default Home;

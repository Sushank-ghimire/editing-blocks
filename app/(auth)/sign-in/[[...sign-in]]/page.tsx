"use client";
import { Button } from "@/components/ui/button";
import { SignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      {isSignedIn ? (
        <Link href={"/"}>
          <Button>Go to homepage</Button>
        </Link>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

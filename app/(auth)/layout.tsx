export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: IAuthLayout) => {
  const { isAuthenticated, userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="min-h-screen w-screen bg-background flex-col">
      {isAuthenticated ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-medium">
            User Authenticated Successfully
          </h1>
          <Button asChild>
            <Link href={"/"}>Go back to homepage</Link>
          </Button>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default AuthLayout;

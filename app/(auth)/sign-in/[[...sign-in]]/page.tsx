import { AuthLayout } from "@/components/layouts";
import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-in – Editing Blocks",
  description:
    "Log in to Editing Blocks to access your collaborative workspace. Continue working on documents with your team in real time.",
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn afterSignInUrl="/" redirectUrl="/sign-in" />
    </AuthLayout>
  );
}

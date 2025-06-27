import { Metadata } from "next";
import { AuthLayout } from "@/components/layouts";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Signup – Editing Blocks",
  description:
    "Join Editing Blocks and start creating and editing documents collaboratively. Work together with your team in real time, organize ideas, and boost productivity.",
};

export default async function SignupPage() {
  return (
    <AuthLayout>
      <SignUp afterSignUpUrl={"/"} forceRedirectUrl={"/"} />
    </AuthLayout>
  );
}

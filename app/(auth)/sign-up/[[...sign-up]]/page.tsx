import { AuthLayout } from "@/components/layouts";
import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - Editing Blocks",
  description: "",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}

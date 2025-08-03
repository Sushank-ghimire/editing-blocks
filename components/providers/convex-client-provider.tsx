"use client";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <div className="flex justify-center min-h-screen bg-background w-screen items-center">
          <SignInButton />
        </div>
      </Unauthenticated>
    </ConvexProviderWithClerk>
  );
}

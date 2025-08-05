"use client";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode, useMemo } from "react";
import { useAuth, SignIn, ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme(); // 'light' | 'dark' | 'system
  //
  const clerkTheme = useMemo(() => {
    if (resolvedTheme === "dark") return dark;
    if (resolvedTheme === "light") return neobrutalism;
    return undefined; // fallback to Clerk default
  }, [resolvedTheme]);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkTheme,
      }}
      afterSignOutUrl={"/sign-in"}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex justify-center min-h-screen bg-background w-screen items-center">
            <SignIn />
          </div>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

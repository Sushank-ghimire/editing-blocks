"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode, useEffect, useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import Loading from "@/app/loading";
import { useTheme } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !resolvedTheme) return <Loading />;
  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : neobrutalism,
      }}
      afterSignOutUrl={"/sign-in"}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

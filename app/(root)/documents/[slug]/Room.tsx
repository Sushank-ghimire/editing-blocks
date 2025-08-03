"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "@/components/index";
import { useUser } from "@clerk/nextjs";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ slug: string }>();
  const { isLoaded } = useUser();

  if (!params?.slug || !isLoaded) return <Loader title="Loading room..." />;

  return (
    <LiveblocksProvider
      resolveUsers={() => []}
      resolveMentionSuggestions={() => []}
      resolveRoomsInfo={() => []}
      throttle={16}
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
    >
      <RoomProvider id={params.slug}>
        <ClientSideSuspense fallback={<Loader title="Loading user's room" />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

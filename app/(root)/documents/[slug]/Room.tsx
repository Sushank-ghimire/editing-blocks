"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "@/components/index";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ slug: string }>();
  return (
    <LiveblocksProvider
      resolveUsers={() => []}
      resolveMentionSuggestions={() => []}
      resolveRoomsInfo={() => []}
      throttle={16}
      authEndpoint={"/api/liveblocks-auth/"}
    >
      <RoomProvider id={params.slug}>
        <ClientSideSuspense fallback={<Loader title="Loading user's room" />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

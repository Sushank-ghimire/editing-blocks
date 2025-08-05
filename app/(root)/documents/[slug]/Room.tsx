"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "@/components/index";
import { useUser } from "@clerk/nextjs";
import { IUsers } from "@/types";
import { getUsers } from "@/app/actions";
import { toast } from "sonner";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ slug: string }>();
  const { isLoaded } = useUser();

  const [users, setUsers] = useState<IUsers[]>([]);
  const fetchUsers = useCallback(async () => {
    try {
      const list = await getUsers();
      setUsers(list);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    }
  }, []); // No deps, runs only once unless you add some

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!params?.slug || !isLoaded) return <Loader title="Loading room..." />;

  return (
    <LiveblocksProvider
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) =>
          users.find((user) => user.id === userId)
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;
        if (text) {
          filteredUsers = users.filter(
            (user) => user.name === text.toLowerCase()
          );
        }
        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
      throttle={16}
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
      // authEndpoint={async () => {
      //   const authEndpoint = "/api/liveblocks-auth";
      //   const room = params.slug;
      //   const res = await fetch(authEndpoint, {
      //     method: "POST",
      //     body: JSON.stringify({ room }),
      //   });
      //   return await res.json();
      // }}
    >
      <RoomProvider
        initialStorage={{ leftMargin: 50, rightMargin: 50 }}
        id={params.slug}
      >
        <ClientSideSuspense fallback={<Loader title="Loading user's room" />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

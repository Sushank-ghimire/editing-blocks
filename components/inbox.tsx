"use client";
import { ClientSideSuspense } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";

const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <button
          disabled
          className="relative flex items-center justify-center p-2 rounded-full hover:bg-accent cursor-pointer"
        >
          <Bell className="size-5 text-foreground" />
        </button>
      }
    >
      <div className="w-fit">
        <InboxMenu />
      </div>
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative flex items-center justify-center p-2 rounded-full hover:bg-accent cursor-pointer">
          <Bell className="size-5 text-foreground" />
          {inboxNotifications?.length > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold">
              {inboxNotifications.length}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {inboxNotifications.length > 0 ? (
          <InboxNotificationList>
            {inboxNotifications.map((notification) => {
              return (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                />
              );
            })}
          </InboxNotificationList>
        ) : (
          <div className="w-full p-2 items-center flex text-foreground font-bold text-sm">
            No notification
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Inbox;

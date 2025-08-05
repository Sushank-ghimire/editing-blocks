"use client";
import { IAvatarProps } from "@/types";
import { ClientSideSuspense, useOthers, useSelf } from "@liveblocks/react";
import Image from "next/image";
import { Separator } from "./ui/separator";

const SIZE = 40;

const AvatarStack = () => {
  const users = useOthers();
  const currUser = useSelf();
  if (users.length === 0) return null;
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative  ml-3 flex-1">
          {currUser && <Avatar name="You" src={currUser.info.avatar} />}
        </div>
        <div className="flex gap-2">
          {users.map((user) => (
            <Avatar
              key={user.connectionId}
              name={user.info.name}
              src={user.info.avatar}
            />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" />
    </>
  );
};

const Avatar = ({ src, name }: IAvatarProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "5px",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
        maxWidth: "200px",
      }}
      className="avatar-container"
    >
      <Image
        src={src}
        alt={name}
        style={{
          height: SIZE,
          width: SIZE,
          borderRadius: "50%",
          objectFit: "cover",
        }}
        height={SIZE}
        width={SIZE}
        className="avatar-image"
      />
      <span
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        }}
        className="avatar-name"
      >
        {name}
      </span>
    </div>
  );
};

const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

export default Avatars;

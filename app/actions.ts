"use server";
import { IUsers } from "@/types";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUsers(): Promise<IUsers[]> {
  try {
    const sessionclaims = await auth();
    const clerk = await clerkClient();

    const res = await clerk.users.getUserList({
      organizationId: [sessionclaims?.orgId as string],
    });
    const users = res.data.map((user) => {
      return {
        id: user.id,
        name:
          user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Guest",
        avatar: user.imageUrl,
      };
    });
    return users;
  } catch (error) {
    console.log("Error : ", error);
    if (error) {
      throw Error("Error while getting users");
    }
    return [];
  }
}

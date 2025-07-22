import { NextRequest, NextResponse } from "next/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    if (!sessionClaims) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const room = await req.json();

    const document = await convex.query(api.documents.getDocumentById, {
      id: room,
    });

    if (!document) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const isOwner = document.ownerId === user.id;
    const isOrganizationMember = !!(
      document.organizationId &&
      document.organizationId === sessionClaims.org_id
    );

    if (!isOwner && !isOrganizationMember) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.fullName ?? "Guest User",
        avatar: user.imageUrl,
      },
    });
    session.allow(room, session.FULL_ACCESS);

    const { body, status } = await session.authorize();

    return NextResponse.json({ body }, { status });
  } catch (error) {
    const errormessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { message: "Error occured", error: errormessage },
      { status: 500 }
    );
  }
}

import db from "@/modules/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, gameId, teamId } = body;

    if (!username || !gameId || !teamId) {
      return NextResponse.json(
        { error: "Unique username, gameId and teamId are required" },
        { status: 400 }
      );
    }

    const newPlayer = await db.player.create({
      data: { username, gameId, teamId },
    });

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
}

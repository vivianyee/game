import { prisma } from "../../../../../lib/Prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameName } = body;

    if (!gameName) {
      return NextResponse.json(
        { error: "Game name is required" },
        { status: 400 }
      );
    }

    const game = await prisma.game.findUnique({
      where: {
        gameName,
      },
    });

    if (game === null) {
      return NextResponse.json(
        {
          error: `Please provide an existing game name.`,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to join game: ${error}` },
      { status: 500 }
    );
  }
}

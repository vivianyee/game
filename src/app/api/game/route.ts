import db from "@/modules/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const games = await db.game.findMany();
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

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

    const newGame = await db.game.create({
      data: {
        gameName,
      },
    });

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: `Please provide a unique game name.`,
          },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      { error: `Failed to create game: ${error}` },
      { status: 500 }
    );
  }
}

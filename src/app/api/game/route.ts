import db from "@/modules/db";
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
        { error: "Unique gameName is required" },
        { status: 400 }
      );
    }

    const newGame = await db.game.create({
      data: {
        name: gameName,
        teams: {
          create: [{ teamName: "Team 1" }, { teamName: "Team 2" }],
        },
      },
    });

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `"Failed to create game" ${error}` },
      { status: 500 }
    );
  }
}

import db from "@/modules/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerName, gameId } = body;

    if (!playerName || !gameId) {
      return NextResponse.json(
        { error: "Player name, and gameId are required" },
        { status: 400 }
      );
    }

    const newPlayer = await db.player.create({
      data: { playerName, gameId },
      include: {
        game: {
          select: {
            gameName: true,
          },
        },
      },
    });

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: `Please provide a unique player name.`,
          },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      { error: "Failed to create player." },
      { status: 500 }
    );
  }
}

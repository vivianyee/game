import { prisma } from "../../../../lib/Prisma"
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerName, socketId, gameId } = body;

    if (!playerName || !socketId || !gameId) {
      return NextResponse.json(
        { error: "Player name, socketId, and gameId are required" },
        { status: 400 }
      );
    }

    const newPlayer = await prisma.player.create({
      data: { playerName, socketId, gameId },
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

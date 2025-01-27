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
      data: { name: gameName },
    });

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameName } = body;

    if (!gameName) {
      return NextResponse.json(
        { error: "Unique gameName is required" },
        { status: 400 }
      );
    }
    const updateGame = await db.game.update({
      where: {
        id: 'xxx',
      },
      data: {
        name: 'Viola the Magnificent',
      },
    })

    const newGame = await db.game.create({
      data: { name: gameName },
    });

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required to delete" },
        { status: 400 }
      );
    }

    const deletedUser = await db.user.delete({
      where: { username },
    });

    return NextResponse.json(deletedUser, { status: 201 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

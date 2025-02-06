import db from "@/modules/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameName } = body;
    const game = await db.game.findUniqueOrThrow({
      where: {
        name: gameName,
      },
    });
    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "There is a duplicate" },
      { status: 500 }
    );
  }
}

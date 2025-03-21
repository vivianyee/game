"use client";

import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function GameTable() {
  const router = useRouter();
  const { games } = useContext(WebSocketContext);
  const gamesData = Object.entries(games)
    .filter(([key]) => key !== "webSocketPlayerGame")

  return (
    <div>
      {gamesData.map((gameData) => {
        const gameDataId = gameData[0];
        const gameDataValue = gameData[1];
        return (
          <div key={gameDataValue.gameName}>
            {gameDataValue.gameName} :{" "}
            {Object.keys(gameDataValue.players).length}/5 players
            <button
              disabled={Object.keys(gameDataValue.players).length === 5}
              onClick={() => {
                router.push(`/${gameDataId}`);
              }}
            >
              Join Game
            </button>
          </div>
        );
      })}
    </div>
  );
}

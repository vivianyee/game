"use client";

import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { useContext } from "react";

export default function GameTable() {
  const { games } = useContext(WebSocketContext);

  const gamesData = Object.values(games);
  return (
    <div>
      {gamesData.map((gamedata) => {
        return (
          <div key={gamedata.gameName}>
            {gamedata.gameName} : {Object.keys(gamedata.players).length} players
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { Error } from "@/components/Error";
import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { useContext } from "react";

export default function GameTable() {
  const { games } = useContext(WebSocketContext);

  const gamesData = Object.values(games);
  return (
    <div>
      {gamesData.map((gamedata) => {
        return <div key={gamedata.gameName}>{gamedata.gameName}</div>;
      })}
    </div>
  );
}

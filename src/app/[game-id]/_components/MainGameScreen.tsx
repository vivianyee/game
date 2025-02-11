"use client";

import { Error } from "@/components/Error";
import CreatePlayerModal from "./CreatePlayerModal";
import { useContext } from "react";
import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { usePathname } from "next/navigation";

export default function MainGameScreen() {
  const { games } = useContext(WebSocketContext);
  const searchParams = usePathname();

  const gameId = searchParams.substring(1);
  const gameData = games[gameId];

  if (gameData) {
    const playerData = Array.from(gameData.players.values());
    return (
      <div>
        <h2>WELCOME TO {gameData.gameName}</h2>
        <h2>
          Players:
          {playerData.map((player) => {
            return <p>{player}</p>;
          })}
        </h2>
        <CreatePlayerModal gameId={gameId} />
      </div>
    );
  }
  return <Error />;
}

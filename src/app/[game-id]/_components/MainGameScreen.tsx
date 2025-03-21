"use client";

import { Error } from "@/components/Error";
import CreatePlayerModal from "./CreatePlayerModal";
import { useContext, useState } from "react";
import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { usePathname } from "next/navigation";
import StartingScreen from "./StartingScreen/StartingScreen";
import { GameWebSocket } from "@/types/game";
import GameScreen from "./GameScreen/GameScreen";

export default function MainGameScreen() {
  const [playerName, setPlayerName] = useState<string | undefined>(undefined);
  const { games } = useContext(WebSocketContext);
  const searchParams = usePathname();

  const gameId = searchParams.substring(1);
  const gameData: GameWebSocket = games[gameId];
console.log(games)
  if (gameData) {
    return (
      <div>
        <h2>WELCOME TO {gameData.gameName}</h2>
        {!playerName ? (
          <CreatePlayerModal gameId={gameId} setPlayerName={setPlayerName} />
        ) : gameData.turn === 0 ? (
          <StartingScreen gameId={gameId} players={gameData.players} />
        ) : (
          <GameScreen gameData={gameData} />
        )}
      </div>
    );
  }
  return <Error />;
}

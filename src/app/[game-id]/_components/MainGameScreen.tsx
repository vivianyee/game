"use client";

import { Error } from "@/components/Error";
import CreatePlayerModal from "./CreatePlayerModal";
import { useContext, useState } from "react";
import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { usePathname, useRouter } from "next/navigation";
import StartingScreen from "./StartingScreen/StartingScreen";
import { GameWebSocket } from "@/types/game";
import GameScreen from "./GameScreen/GameScreen";
import { SocketIdContext } from "@/contexts/SocketIdProvider";

export default function MainGameScreen() {
  const router = useRouter();
  const searchParams = usePathname();
  const socketId = useContext(SocketIdContext);
  const { games, webSocketPlayerGame } = useContext(WebSocketContext);
  const gameId = searchParams.substring(1);
  const gameData: GameWebSocket = games[gameId];

  const [playerName, setPlayerName] = useState<string | undefined>(
    gameData.players[socketId]
  );

  if (gameData) {
    return (
      <div>
        <h2>WELCOME TO {gameData.gameName}</h2>
        {!playerName ? (
          Object.entries(gameData.players).length >= 5 ? (
            <div>
              <h4>
                Too many players currently in game, please navigate back to home
              </h4>
              <button
                onClick={() => {
                  router.push(`/`);
                }}
              >
                Back
              </button>
              <Error />
            </div>
          ) : webSocketPlayerGame[socketId] ? (
            <div>
              <h4>
                You're already registered in another game. Please refresh or
                return to the previous game
              </h4>
              <button
                onClick={() => {
                  router.push(`/`);
                }}
              >
                Back
              </button>
              <Error />
            </div>
          ) : (
            <CreatePlayerModal gameId={gameId} setPlayerName={setPlayerName} />
          )
        ) : !gameData.turn ? (
          <StartingScreen gameId={gameId} players={gameData.players} />
        ) : (
          <GameScreen gameData={gameData} />
        )}
      </div>
    );
  }
  return <Error />;
}

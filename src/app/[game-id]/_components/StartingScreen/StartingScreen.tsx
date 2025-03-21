"use client";

import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { useContext, useState } from "react";

type Props = {
  gameId: string;
  players: { [key: string]: string };
};

export default function StartingScreen({ gameId, players }: Props) {
  const playerData = Object.entries(players);
  const [error, setError] = useState<string | undefined>();
  const { send } = useContext(WebSocketContext);

  const startGame = () => {
    if (!send) {
      setError("Please wait a sec");
    } else if (playerData.length <= 1) {
      setError("Please wait for more players to join");
    } else {
      send(
        JSON.stringify({
          gameId,
        })
      );
    }
  };

  return (
    <div>
      Players:
      {playerData.map((player) => {
        return <p key={Object.values(player)[0]}>{player[1]}</p>;
      })}
      {error && error}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

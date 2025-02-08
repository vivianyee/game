import { useState } from "react";

export const useJoinGame = () => {
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [joinGameError, setJoinGameError] = useState("");

  const joinGame = async (gameName: string) => {
    setIsJoiningGame(true);
    try {
      const res = await fetch("/api/game/find-game-by-name", {
        method: "POST",
        body: JSON.stringify({
          gameName,
        }),
      });
      setIsJoiningGame(false);
      if (res.ok) {
        const response = await res.json();
        return response;
      } else {
        const { error } = await res.json();
        setJoinGameError(error);
      }
    } catch {
      setJoinGameError("Failed to join game, please try again later.");
      setIsJoiningGame(false);
    }
  };

  return { isJoiningGame, joinGameError, joinGame };
};

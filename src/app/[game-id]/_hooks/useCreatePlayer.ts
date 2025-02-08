import { useState } from "react";

export const useCreatePlayer = () => {
  const [isCreatingPlayer, setIsCreatingPlayer] = useState(false);
  const [newPlayerError, setNewPlayerError] = useState("");

  const createNewPlayer = async (playerName: string, gameId: string) => {
    setIsCreatingPlayer(true);
    try {
      const res = await fetch("/api/player", {
        method: "POST",
        body: JSON.stringify({
          playerName,
          gameId,
        }),
      });
      setIsCreatingPlayer(false);
      if (res.ok) {
        const response = await res.json();
        return response;
      } else {
        const { error } = await res.json();
        setNewPlayerError(error);
        throw new Error("Can't create Player", error);
      }
    } catch {
      setNewPlayerError("Failed to create player.");
      setIsCreatingPlayer(false);
      return undefined;
    }
  };

  return {
    isCreatingPlayer,
    newPlayerError,
    createNewPlayer,
  };
};

import { Player } from "@/types/game";
import { useState } from "react";

export const useCreatePlayer = () => {
  const [isCreatingPlayer, setIsCreatingPlayer] = useState(false);
  const [newPlayerError, setNewPlayerError] = useState("");
  const [newPlayerCreated, setNewPlayerCreated] = useState<Player | undefined>(
    undefined
  );

  const createNewPlayer = async (
    username: string,
    gameId: string,
    teamId: string
  ) => {
    setIsCreatingPlayer(true);
    try {
      const res = await fetch("/api/player", {
        method: "POST",
        body: JSON.stringify({
          username,
          gameId,
          teamId,
        }),
      });
      setIsCreatingPlayer(false);
      if (res.ok) {
        const response = await res.json();
        setNewPlayerCreated(response);
        return response;
      } else {
        const { error } = await res.json();
        setNewPlayerError("make Player unique");
        throw new Error("Can't create Player", error);
      }
    } catch {
      setNewPlayerError("make Player unique");
      setIsCreatingPlayer(false);
      return undefined;
    }
  };

  return {
    isCreatingPlayer,
    newPlayerCreated,
    newPlayerError,
    createNewPlayer,
  };
};

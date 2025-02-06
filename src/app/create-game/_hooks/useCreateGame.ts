import { Game } from "@/types/game";
import { useState } from "react";

export const useCreateGame = () => {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [newGameError, setNewGameError] = useState('');
  const [newGameCreated, setNewGameCreated] = useState<Game | undefined>(undefined);

  const createNewGame = async (gameName: string) => {
    setIsCreatingGame(true);
    try {
      const res = await fetch("/api/game", {
        method: "POST",
        body: JSON.stringify({
          gameName,
        }),
      });
      setIsCreatingGame(false);
      if (res.ok) {
        const response = await res.json();
        setNewGameCreated(response);
        return response;
      } else {
        const { error } = await res.json();
        setNewGameError("make game unique");
        throw new Error("Can't create game", error);
      }
    } catch {
      setNewGameError("make game unique");
      setIsCreatingGame(false);
      return undefined;
    }
  };

  return { isCreatingGame, newGameCreated, newGameError, createNewGame };
};

import { useState } from "react";

export const useCreateGame = () => {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [newGameError, setNewGameError] = useState('');

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
        return response;
      } else {
        const { error } = await res.json();
        setNewGameError(error);
      }
    } catch {
      setNewGameError("Failed to create game, please try again later.");
      setIsCreatingGame(false);
    }
  };

  return { isCreatingGame, newGameError, createNewGame };
};

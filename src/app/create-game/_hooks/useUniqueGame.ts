import { useState } from "react";

export const useUniqueGame = () => {
  const [isGrabbingUnique, setIsGrabbingUnique] = useState(false);
  const [isUnique, setIsUnique] = useState(true);
  const [newGameCreated, setNewGameCreated] = useState(undefined);

  const createNewGame = async (gameName: string) => {
    setIsGrabbingUnique(true);
    try {
      const res = await fetch("/api/game/find-unique", {
        method: "GET",
        body: JSON.stringify({
          gameName,
        }),
      });
      setIsGrabbingUnique(false);
      if (res.ok) {
        const response = await res.json();
        setNewGameCreated(response);
        return response;
      } else {
        const { error } = await res.json();
        setNewGameError("ERROR");
        throw new Error("Can't create game", error);
      }
    } catch {
      setNewGameError("ERROR");
      setIsCreatingGame(false);
      return undefined;
    }
  };

  return { isCreatingGame, newGameCreated, newGameError, createNewGame };
};

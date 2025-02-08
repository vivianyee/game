"use client";

import { useContext, useState } from "react";
import { useCreateGame } from "@/app/create-game/_hooks/useCreateGame";
import { Loading } from "@/components/Loading";
import { InputSubmit } from "@/components/InputSubmit";
import { useRouter } from "next/navigation";
import { WebSocketContext } from "@/contexts/WebSocketProvider";

export default function CreateGame() {
  const [gameName, setGameName] = useState("");
  const { createNewGame, isCreatingGame, newGameError } = useCreateGame();
  const { send } = useContext(WebSocketContext);
  const router = useRouter();

  const onClickCreate = async () => {
    const game = await createNewGame(gameName);
    if (send && game) {
      send(
        JSON.stringify({
          type: "addGame",
          gameName: game.gameName,
        })
      );
      router.push(`/${game.id}`);
    }
  };

  if (isCreatingGame) {
    return <Loading />;
  }

  return (
    <InputSubmit
      setInputValue={setGameName}
      error={newGameError}
      buttonLabel="Create Game"
      onButtonClick={onClickCreate}
    />
  );
}

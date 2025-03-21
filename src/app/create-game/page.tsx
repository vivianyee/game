"use client";

import { useContext, useState } from "react";
import { useCreateGame } from "@/app/create-game/_hooks/useCreateGame";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { InputSubmit } from "@/components/InputSubmit";
import { useRouter } from "next/navigation";
import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { SocketIdContext } from "@/contexts/SocketIdProvider";

export default function CreateGame() {
  const [gameName, setGameName] = useState("");
  const socketId = useContext(SocketIdContext);
  const { createNewGame, isCreatingGame, newGameError } = useCreateGame();
  const { send, webSocketPlayerGame } = useContext(WebSocketContext);
  const router = useRouter();

  const onClickCreate = async () => {
    const game = await createNewGame(gameName);

    if (send && game) {
      send(
        JSON.stringify({
          type: "addGame",
          gameId: game.id,
          gameName: game.gameName,
        })
      );
      router.push(`/${game.id}`);
    }
  };

  if (isCreatingGame) {
    return <Loading />;
  }
  
  if (webSocketPlayerGame[socketId]) {
    return (
      <div>
        <h4>
          You're already registered in another game. Please refresh or return to
          the previous game
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
    );
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

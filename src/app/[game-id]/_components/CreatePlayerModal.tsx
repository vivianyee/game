"use client";

import { useContext, useState } from "react";
import { useCreatePlayer } from "../_hooks/useCreatePlayer";
import { Loading } from "@/components/Loading";
import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { InputSubmit } from "@/components/InputSubmit";

type Props = {
  gameId: string;
  setPlayerName: (playerName: string | undefined) => void;
};

export default function CreatePlayerModal({ gameId, setPlayerName }: Props) {
  const [name, setName] = useState("");
  const { isCreatingPlayer, newPlayerError, createNewPlayer } =
    useCreatePlayer();
  const { send } = useContext(WebSocketContext);

  const onClickCreatePlayer = async () => {
    const newPlayerCreated = await createNewPlayer(name, gameId);
    if (send && newPlayerCreated) {
      setPlayerName(name);
      send(
        JSON.stringify({
          type: "addPlayer",
          playerName: newPlayerCreated.id,
          gameId: gameId,
        })
      );
    }
  };

  if (isCreatingPlayer) {
    return <Loading />;
  }

  return (
    <div>
      <h2>put in your player name!</h2>
      <InputSubmit
        setInputValue={setName}
        error={newPlayerError}
        buttonLabel="Create Game"
        onButtonClick={onClickCreatePlayer}
      />
    </div>
  );
}

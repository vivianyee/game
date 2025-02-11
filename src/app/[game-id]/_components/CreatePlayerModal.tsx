"use client";

import { useContext, useState } from "react";
import { useCreatePlayer } from "../_hooks/useCreatePlayer";
import { Loading } from "@/components/Loading";
import { WebSocketContext } from "@/contexts/WebSocketProvider";
import { InputSubmit } from "@/components/InputSubmit";

type Props = {
  gameId: string;
};

export default function CreatePlayerModal({ gameId }: Props) {
  const [playerName, setPlayerName] = useState("");
  const { isCreatingPlayer, newPlayerError, createNewPlayer } =
    useCreatePlayer();

  const { send } = useContext(WebSocketContext);

  const onClickCreatePlayer = async () => {
    const newPlayerCreated = await createNewPlayer(playerName, gameId);
    if (send && newPlayerCreated) {
      send(
        JSON.stringify({
          type: "addPlayer",
          playerName: newPlayerCreated.id,
          gameId: gameId,
          gameName: newPlayerCreated.game.gameName,
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
        setInputValue={setPlayerName}
        error={newPlayerError}
        buttonLabel="Create Game"
        onButtonClick={onClickCreatePlayer}
      />
    </div>
  );
}

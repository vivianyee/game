"use client";

import { useEffect, useState } from "react";
import { useCreatePlayer } from "../_hooks/useCreatePlayer";
import { Loading } from "@/components/Loading";
import { refreshGames } from "@/hooks/useRevalidatePath";

type Props = {
  gameId: string;
  teamId: string;
};

export default function CreatePlayerModal({ gameId, teamId }: Props) {
  const [username, setUsername] = useState("");
  const {
    isCreatingPlayer,
    newPlayerCreated,
    newPlayerError,
    createNewPlayer,
  } = useCreatePlayer();

  useEffect(() => {
    if (newPlayerCreated) {
      refreshGames("/[game-id]");
    }
  }, [newPlayerCreated]);

  if (isCreatingPlayer) {
    return <Loading />;
  }

  return (
    <div>
      {newPlayerError && <div>{newPlayerError}</div>}
      <h2>put in your player name!</h2>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button
        onClick={() => {
          createNewPlayer(username, gameId, teamId);
        }}
      >
        Enter
      </button>
    </div>
  );
}

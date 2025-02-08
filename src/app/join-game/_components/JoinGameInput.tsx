"use client"

import { InputSubmit } from "@/components/InputSubmit";
import { useJoinGame } from "../_hooks/useJoinGame";
import { useState } from "react";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function JoinGameInput() {
  const [gameName, setGameName] = useState("");
  const { isJoiningGame, joinGameError, joinGame } = useJoinGame();
    const router = useRouter()

  const onClickJoin = async () => {
    const game = await joinGame(gameName);
    if (game) {
      router.push(`/${game.id}`);
    }
  };

  if (isJoiningGame) {
    return <Loading />;
  }

  return (
    <InputSubmit
      setInputValue={setGameName}
      error={joinGameError}
      buttonLabel="Join Game"
      onButtonClick={onClickJoin}
    />
  );
}

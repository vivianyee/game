"use client";

import { useEffect, useState } from "react";
import { useCreateGame } from "@/app/create-game/_hooks/useCreateGame";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function CreateGame() {
  const [gameName, setGameName] = useState("");
  const { createNewGame, isCreatingGame, newGameError, newGameCreated } = useCreateGame();
  const router = useRouter()

  useEffect(() => {
    if(newGameCreated){
      console.log("wat")
      router.push(`/${newGameCreated.id}`);
    }
  },[newGameCreated])

  if (isCreatingGame) {
    return <Loading />;
  }

  return (
    <div>
      {newGameError && <div>{newGameError}</div>}
      <input type="text" onChange={(e) => setGameName(e.target.value)} />
      <button onClick={() => createNewGame(gameName)}>Create game</button>
    </div>
  );
}

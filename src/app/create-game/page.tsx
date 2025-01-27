"use client";

import { useEffect, useState } from "react";
import { useCreateGame } from "@/hooks/useCreateGame";
import { Loading } from "@/components/Loading";

export default function CreateGame() {
  const [gameName, setGameName] = useState("");
  const { createNewGame, isCreatingGame, newGameError, newGameCreated } = useCreateGame();

  useEffect(() => {
    if(newGameCreated){
      // redirect
      console.log(newGameError)
    }
  },[newGameCreated])

  if (isCreatingGame) {
    return <Loading />;
  }

  return (
    <div>
      {newGameError && <div>yo make name unique</div>}
      <input type="text" onChange={(e) => setGameName(e.target.value)} />
      <button onClick={() => createNewGame(gameName)}>Create game</button>
    </div>
  );
}

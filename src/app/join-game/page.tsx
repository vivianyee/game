import { Suspense } from "react";
import GameTable from "./_components/GameTable";
import { Loading } from "@/components/Loading";
import JoinGameInput from "./_components/JoinGameInput";

export default function JoinGame() {
  return (
    <div>
      <JoinGameInput />
      <GameTable />
    </div>
  );
}

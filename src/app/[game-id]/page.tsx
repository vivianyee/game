import { Suspense } from "react";
import MainGameScreen from "./_components/MainGameScreen";
import { Loading } from "@/components/Loading";

export const GamePage = ({ params }: { params: Promise<{ "game-id": string }> }) => {
  return (
    <Suspense fallback={<Loading />}>
      <MainGameScreen params={params}/>
    </Suspense>
  );
}

export default GamePage
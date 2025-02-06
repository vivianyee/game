import { Error } from "@/components/Error";
import { Game } from "@/types/game";
import CreatePlayerModal from "./CreatePlayerModal";

type Props = {
  params: Promise<{ "game-id": string }>;
};

export default async function MainGameScreen({ params }: Props) {
  const gameId = (await params)["game-id"]
  const response = await fetch(process.env.API_URL + "/api/game/find-game", {
    method: "POST",
    body: JSON.stringify({
      gameId,
    }),
    cache: "no-store",
  });
  
  if (response.ok) {
    const game: Game = await response.json();
    console.log(game)

    if (game.players.length === 0) {
      return <CreatePlayerModal gameId={gameId} teamId={game.teams[0].id} />;
    }

    return (
      <div>
        <h2>WELCOME TO {game.name}</h2>
      </div>
    );
  }
  return <Error />;
}

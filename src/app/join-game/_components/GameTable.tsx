import { Game } from "@prisma/client";
import { Error } from "@/components/Error";

export default async function GameTable() {
  const response = await fetch(process.env.API_URL + "/api/game", {
    method: "GET",
    cache: "no-store",
  });
  if (response.ok) {
    const listedGames: Game[] = await response.json();

    return (
      <div>
        {listedGames.map((game) => (
          <div key={game.id}>{game.name}</div>
        ))}
      </div>
    );
  }

  return <Error />;
}

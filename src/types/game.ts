export interface Game {
  id: string;
  gameName: string;
  createdAt: Date;
  updatedAt: Date;

  players: Player[];
}

export interface Player {
  id: string;
  playerName: string;
  gameId: string;
  joinedAt: Date;

  game: Game;
}

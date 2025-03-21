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

export type GamesContext = {
  [key: string]: {
    turn: number | undefined;
    usedCard: number | undefined;
    gameName: string;
    players: { [key: string]: string };
  };
};

export type GamesWebSocket = {
  webSocketPlayerGame?: { [key: string]: string };
} & GamesContext;

export type GameWebSocket = {
  turn: number | undefined;
  usedCard: number | undefined;
  gameName: string;
  players: { [key: string]: string };
};

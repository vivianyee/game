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

export type GamesWebSocket = {
  [key: string]: {
    turn: number | undefined;
    usedCard: number | undefined;
    gameName: string;
    players: { [key: string]: string };
  }; // Game name to player websocket to player name
};

export type GameWebSocket = {
  turn: number | undefined;
  usedCard: number | undefined;
  gameName: string;
  players: { [key: string]: string };
};

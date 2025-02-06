export interface Game {
  id: string;
  name: string;
  players: Player[];
  teams: Team[];
}

export interface Player {
  id: string;
  username: string;
  gameId: string;
  teamId: string;
}

export interface Team {
  id: string;
  gameId: string;
  teamName: string;
}

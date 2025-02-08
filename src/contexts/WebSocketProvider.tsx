"use client";

import { createContext, useState, useEffect, useRef } from "react";

type Props = {
  children?: React.ReactNode;
};

type WebSocketType = {
  isReady: boolean;
  games: GamesWebSocket;
  send:
    | ((
        data: string | ArrayBufferLike | Blob | ArrayBufferView<ArrayBufferLike>
      ) => void)
    | undefined;
};

const initialWebSocket: WebSocketType = {
  isReady: false,
  games: {},
  send: undefined,
};

type GamesWebSocket = {
  [key: string]: Map<WebSocket, string>; // Game name to player websocket to player name
};

const webSocketPlayerGame = new Map<WebSocket, string>(); // WebSockets to game name

export const WebSocketContext = createContext(initialWebSocket);

export const WebSocketProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [games, setGames] = useState<GamesWebSocket>({}); // Stores { game name: { socket: name } }

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      setIsReady(true);
      console.log("WebSocket is connected!");
    };
    socket.onclose = () => {
      setIsReady(false);
      console.log("WebSocket is closed!");
    };
    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      try {
        console.log(event)
        const json = JSON.parse(event.data.match(/{.*}/));
        switch (json.type) {
          case "addPlayer":
            const playerGameName = json.gameName;
            setGames((prevGames) => {
              const newGames = prevGames;
              if (!newGames[playerGameName]) {
                newGames[playerGameName] = new Map<WebSocket, string>();
              }
              newGames[playerGameName].set(socket, json.playerName);
              webSocketPlayerGame.set(socket, playerGameName);
              return newGames;
            });
          case "addGame":
            const gameName = json.gameName;
            setGames((prevGames) => {
              const newGames = prevGames;
              if (!newGames[gameName]) {
                newGames[gameName] = new Map<WebSocket, string>();
              }
              return newGames;
            });
        }
      } catch (e) {
        throw new Error("failure web socket");
      }
    };

    ws.current = socket;

    return () => {
      setGames((prevGames) => {
        const newGames = prevGames;
        const gameName = webSocketPlayerGame.get(socket);
        if (gameName) {
          newGames[gameName].delete(socket);
        }
        return newGames;
      });
      socket.close();
    };
  }, []);

  const ret = {
    isReady,
    games,
    send: ws.current
      ? ws.current.send.bind(ws.current)
      : () => {
          console.log("NOT RDY");
        },
  };

  return (
    <WebSocketContext.Provider value={ret}>
      {children}
    </WebSocketContext.Provider>
  );
};

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
  [key: string]: { gameName: string; players: { [key: string]: string } }; // Game name to player websocket to player name
};

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
      setGames(JSON.parse(event.data));
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [setGames]);

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

"use client";

import { GamesContext, GamesWebSocket } from "@/types/game";
import { createContext, useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SocketIdContext } from "./SocketIdProvider";

type Props = {
  children?: React.ReactNode;
};

type WebSocketType = {
  webSocketPlayerGame: { [key: string]: string };
  isReady: boolean;
  games: GamesContext;
  send:
    | ((
        data: string | ArrayBufferLike | Blob | ArrayBufferView<ArrayBufferLike>
      ) => void)
    | undefined;
};

const initialWebSocket: WebSocketType = {
  webSocketPlayerGame: {},
  isReady: false,
  games: {},
  send: undefined,
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

  const gameSend = { ...games };
  delete gameSend.webSocketPlayerGame;

  const ret: WebSocketType = {
    isReady,
    webSocketPlayerGame: games.webSocketPlayerGame
      ? games.webSocketPlayerGame
      : {},
    games: gameSend,
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

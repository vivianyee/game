import { useEffect, useState } from "react";

export type GamesWebSocket = {
  [key: string]: Map<WebSocket, string>; // Game name to player websocket to player name
};

export type WebSocketType = {
  isReady: boolean;
  games: GamesWebSocket;
  send:
    | ((
        data: string | ArrayBufferLike | Blob | ArrayBufferView<ArrayBufferLike>
      ) => void)
    | undefined;
};

export const useWebSocketData = () => {
  const [isFetchingSocketData, setIsFetchingSocketData] = useState(false);
  const [socketData, setSocketData] = useState<GamesWebSocket>({});
  const [fetchingSocketDataError, setFetchingSocketDataError] = useState("");

  useEffect(() => {
    const getWebSocketData = async () => {
      setIsFetchingSocketData(true);
      try {
        const res = await fetch(process.env.API_URL + "/api/game", {
          method: "GET",
          cache: "no-store",
        });
        setIsFetchingSocketData(false);
        if (res.ok) {
          const response = await res.json();
          console.log(response)
        } else {
          const { error } = await res.json();
          setFetchingSocketDataError(error);
        }
      } catch {
        setFetchingSocketDataError(
          "Failed to getWebSocketData, please try again later."
        );
        setIsFetchingSocketData(false);
      }
    };
    getWebSocketData();
  });

  return { fetchingSocketDataError, isFetchingSocketData, socketData };
};

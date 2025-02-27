const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const WebSocket = require("ws");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const game = {}; // Stores { gameid: gamename: '', players: { 'socket': 'name' } }
const webSocketPlayerGame = new Map(); // WebSockets to game name

app.prepare().then(() => {
  const server = createServer((req, res) => {
    if (req.url.includes("_next/webpack-hmr")) {
      res.writeHead(400);
      return res.end();
    }
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.send(JSON.stringify(game));

    ws.on("message", (message) => {
      const data = JSON.parse(message);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          switch (data.type) {
            case "addPlayer":
              const addPlayerData = data;
              if (!game[addPlayerData.gameId]) {
                game[addPlayerData.gameId] = {
                  gameName: addPlayerData.gameName,
                  players: new Map(),
                };
              }
              game[addPlayerData].players.set(client, json.playerName);
              webSocketPlayerGame.set(client, addPlayerData);
            case "addGame":
              const addGameData = data;
              if (!game[addGameData.gameId]) {
                game[addGameData.gameId] = {
                  gameName: addGameData.gameName,
                  players: new Map(),
                };
              }
          }
          client.send(JSON.stringify(game));
        }
      });
    });

    ws.on("close", () => {
      const gameName = webSocketPlayerGame.get(ws);
      if (gameName) {
        game[gameName].players.delete(ws);
      }
      console.log("Client disconnected");
    });
  });

  server.listen(8080, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:8080");
  });
});

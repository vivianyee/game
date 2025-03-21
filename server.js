const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const WebSocket = require("ws");
const { prisma } = require("./lib/prisma");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// {
//   'gameid': {
//     gamename: '',
//     turn: 0,
//     usedCard: 0,
//     players: {
//       // player name
//       // num of bites, card num, app-main-dess-drink
//       // card num x5
//       'socketId': '^-^-^'
//       'socketId': '^-^-^'
//     }
//   }
// }
const game = {};
const webSocketPlayerGame = {};

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

  const loadInitialGameData = async () => {
    try {
      const loadedInitialGames = await prisma.game.findMany({
        include: { players },
      });
      loadedInitialGames.map;
      wss.on("connection", (ws) => {
        console.log("New client connected");
        const socketId = uuidv4();
        ws.send(JSON.stringify(game));

        ws.on("message", (message) => {
          const data = JSON.parse(message);

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              switch (data.type) {
                case "addGame":
                  if (!game[data.gameId]) {
                    game[data.gameId] = {
                      gameName: data.gameName,
                      players: {},
                    };
                  }
                case "addPlayer":
                  if (game[data.gameId]) {
                    game[data.gameId].players[socketId] = data.playerName;
                    webSocketPlayerGame[socketId] = data.gameId;
                  }
                case "startGame":
                  if (game[data.gameId]) {
                    game[data.gameId].turn = 0;
                  }
              }
              client.send(JSON.stringify(game));
            }
          });
        });

        ws.on("close", () => {
          // remove from db
          const gameId = webSocketPlayerGame[socketId];
          webSocketPlayerGame.delete(socketId);
          if (gameId) {
            game[gameId].players.delete(socketId);
          }
          console.log("Client disconnected");
        });
      });
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      await prisma.$disconnect();
    }
  };

  loadInitialGameData();

  server.listen(8080, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:8080");
  });
});

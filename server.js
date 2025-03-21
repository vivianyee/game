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
const game = { webSocketPlayerGame: {} };

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
        include: { players: true },
      });

      loadedInitialGames.forEach((dbGame) => {
        const dbPlayers = {};
        dbGame.players.forEach((dbPlayer) => {
          dbPlayers[dbPlayer.socketId] = dbPlayer.playerName;
          game.webSocketPlayerGame[dbPlayer.socketId] = dbGame.id;
        });
        game[dbGame.id] = {
          gameName: dbGame.gameName,
          turn: 0,
          players: { dbPlayers },
        };
      });

      wss.on("connection", (ws) => {
        let playerSocketId;

        console.log("New client connected");
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
                  break;
                case "addPlayer":
                  if (game[data.gameId]) {
                    playerSocketId = data.socketId;
                    game[data.gameId].players[data.socketId] = data.playerName;
                    game.webSocketPlayerGame[data.socketId] = data.gameId;
                  }
                  break;
                case "startGame":
                  if (game[data.gameId]) {
                    game[data.gameId].turn = 0;
                  }
                  break;
              }
              client.send(JSON.stringify(game));
            }
          });
        });

        ws.on("close", async () => {
          if (playerSocketId) {
            await prisma.player.delete({
              where: { socketId: playerSocketId },
            });
            const gameId = game.webSocketPlayerGame[playerSocketId];
            delete game.webSocketPlayerGame[playerSocketId];
            if (gameId) {
              delete game[gameId].players[playerSocketId];
            }
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(game));
            });
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

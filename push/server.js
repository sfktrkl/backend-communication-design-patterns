import { WebSocketServer } from "ws";

const PORT = 4000;
const wss = new WebSocketServer({ port: PORT }, () => {
  console.log(`Server is running on port ${PORT}`);
});

let connections = [];

wss.on("connection", function connection(ws) {
  connections.push(ws);
  broadcast(`User ${ws._socket.remotePort} just connected.`);

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    broadcast(`User ${ws._socket.remotePort} says: ${data}`);
  });

  ws.on("close", () => {
    connections = connections.filter((connection) => connection !== ws);
    broadcast(`User ${ws._socket.remotePort} has disconnected.`);
  });
});

function broadcast(message) {
  connections.forEach((connection) => {
    connection.send(message);
  });
}

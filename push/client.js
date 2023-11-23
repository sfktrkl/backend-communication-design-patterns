import WebSocket from "ws";

let ws = new WebSocket("ws://localhost:4000");

ws.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

ws.onopen = () => {
  ws.send("Hello! I'm the client");
};

ws.onerror = (error) => {
  console.error(`WebSocket Error: ${error}`);
};

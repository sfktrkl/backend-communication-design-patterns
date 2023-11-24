import EventSource from "eventsource";

const sse = new EventSource("http://localhost:4000/stream");
sse.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

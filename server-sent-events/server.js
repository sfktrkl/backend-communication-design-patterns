import express from "express";
const app = express();
app.use(express.json());

var counter = 0;
function increment() {
  setTimeout(() => {
    ++counter;
    increment();
  }, 1000);
}
increment();

function send(res) {
  const val = counter;
  res.write("data: " + `Message from server [${val}]\n\n`);
}

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  console.log(`Connection established from ${req.ip}`);

  send(res);
  const intervalId = setInterval(() => {
    send(res);
  }, 1000);

  res.on("close", () => {
    clearInterval(intervalId);
    console.log(`Connection closed from ${req.ip}`);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

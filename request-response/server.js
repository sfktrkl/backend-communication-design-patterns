import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server.");
});

app.post("/api/echo", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required." });
  res.json({ echo: message });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

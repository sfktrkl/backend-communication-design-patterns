import express from "express";
const app = express();
app.use(express.json());

const jobs = {};

app.post("/submit", (req, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = { progress: 0, intervalId: null };

  jobs[jobId].intervalId = setInterval(() => {
    jobs[jobId].progress += 10;
    console.log(`Updated ${jobId} to ${jobs[jobId].progress}%`);

    if (jobs[jobId].progress >= 100) {
      clearInterval(jobs[jobId].intervalId);
      console.log(`Job ${jobId} completed`);
    }
  }, 1000);

  res.status(200).json({ jobId });
});

app.get("/checkstatus", async (req, res) => {
  const jobId = req.query.jobId;
  if (!jobId || !jobs[jobId])
    return res.status(404).json({ error: "Job not found" });

  async function checkJobStatus() {
    return new Promise((resolve, reject) => {
      if (jobs[jobId].progress < 100) {
        setTimeout(() => resolve(false), 1000);
      } else resolve(true);
    });
  }

  while ((await checkJobStatus(req.query.jobId)) == false);
  const progress = jobs[jobId].progress;
  res.status(200).json({ jobStatus: `${progress}%` });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

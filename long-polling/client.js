import axios from "axios";
const serverUrl = "http://localhost:4000";

async function submitJob() {
  let jobId = null;
  await axios
    .post(`${serverUrl}/submit`)
    .then((response) => {
      jobId = response.data.jobId;
      console.log(`Job submitted. Job ID: ${jobId}`);
    })
    .catch((error) => {
      console.log("Error submitting job:", error.response.data);
    });
  return jobId;
}

async function pollJobStatus(jobId) {
  await axios
    .get(`${serverUrl}/checkstatus?jobId=${jobId}`)
    .then((response) => {
      const jobStatus = response.data.jobStatus;
      console.log(`Job Status for ${jobId}: ${jobStatus}`);
      if (jobStatus === "100%") {
        console.log(`Job ${jobId} has completed`);
      }
    })
    .catch((error) => {
      console.log("Error polling job status:", error.response.data);
    });
}

const jobId = await submitJob();
if (jobId) await pollJobStatus(jobId);

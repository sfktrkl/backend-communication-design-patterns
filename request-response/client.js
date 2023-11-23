import axios from "axios";
const serverUrl = "http://localhost:4000";

axios
  .get(`${serverUrl}/`)
  .then((response) => {
    console.log("GET Response:", response.data);
  })
  .catch((error) => {
    console.log("GET Error:", error.response.data);
  });

const message = "Hello from the client.";
axios
  .post(`${serverUrl}/api/echo`, { message })
  .then((response) => {
    console.log("POST Response:", response.data);
  })
  .catch((error) => {
    console.log("POST Error:", error.response.data);
  });

axios
  .post(`${serverUrl}/api/echo`)
  .then((response) => {
    console.log("POST Response:", response.data);
  })
  .catch((error) => {
    console.log("POST Error:", error.response.data);
  });

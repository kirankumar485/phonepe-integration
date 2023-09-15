const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.post("/make-phonepe-request", async (req, res) => {
  try {
    const requestData = {
      request:
        "ewogICJtZXJjaGFudElkIjogIk1FUkNIQU5UVUFUIiwKICAibWVyY2hhbnRUcmFuc2FjdGlvbklkIjogIk1UNzg1MDU5MDA2ODE4ODEwNCIsCiAgIm1lcmNoYW50VXNlcklkIjogIk1VSUQxMjMiLAogICJhbW91bnQiOiAxMDAwMCwKICAicmVkaXJlY3RVcmwiOiAiaHR0cHM6Ly93ZWJob29rLnNpdGUvcmVkaXJlY3QtdXJsIiwKICAicmVkaXJlY3RNb2RlIjogIlJFRElSRUNUIiwKICAiY2FsbGJhY2tVcmwiOiAiaHR0cHM6Ly93ZWJob29rLnNpdGUvY2FsbGJhY2stdXJsIiwKICAibW9iaWxlTnVtYmVyIjogIjk5OTk5OTk5OTkiLAogICJwYXltZW50SW5zdHJ1bWVudCI6IHsKICAgICJ0eXBlIjogIlBBWV9QQUdFIgogIH0KfQ==",
    };
    const phonePeResponse = await makePhonePeRequest(requestData);
    res.json(phonePeResponse);
  } catch (error) {
    console.error("Error making PhonePe request:", error);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: "Failed to make PhonePe request" });
  }
});

async function makePhonePeRequest(requestData) {
  const url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
  const headers = {
    "Content-Type": "application/json",
    "X-VERIFY":
      "ac125a22bebab87667fae925aa3a046c45e2a7a50e9f6764b5f440d461d1f088###1",
    accept: "application/json",
  };

  const response = await axios.post(url, requestData, { headers });
  if (response.status !== 200) {
    throw new Error("PhonePe request failed");
  }

  return response.data;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

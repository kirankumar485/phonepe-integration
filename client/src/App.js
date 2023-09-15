import React, { useState } from "react";
import axios from "axios";

function PhonePePayment() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const initiatePayment = async () => {
    try {
      const requestData = {
        request:
          "ewogICJtZXJjaGFudElkIjogIk1FUkNIQU5UVUFUIiwKICAibWVyY2hhbnRUcmFuc2FjdGlvbklkIjogIk1UNzg1MDU5MDA2ODE4ODEwNCIsCiAgIm1lcmNoYW50VXNlcklkIjogIk1VSUQxMjMiLAogICJhbW91bnQiOiAxMDAwMCwKICAicmVkaXJlY3RVcmwiOiAiaHR0cHM6Ly93ZWJob29rLnNpdGUvcmVkaXJlY3QtdXJsIiwKICAicmVkaXJlY3RNb2RlIjogIlJFRElSRUNUIiwKICAiY2FsbGJhY2tVcmwiOiAiaHR0cHM6Ly93ZWJob29rLnNpdGUvY2FsbGJhY2stdXJsIiwKICAibW9iaWxlTnVtYmVyIjogIjk5OTk5OTk5OTkiLAogICJwYXltZW50SW5zdHJ1bWVudCI6IHsKICAgICJ0eXBlIjogIlBBWV9QQUdFIgogIH0KfQ==",
      };

      const response = await axios.post(
        "http://localhost:3000/make-phonepe-request",
        requestData
      );

      setResponseData(response.data);
      setError(null);

      if (response.data.success) {
        window.open(
          response.data.data.instrumentResponse.redirectInfo.url,
          "_blank"
        );
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setResponseData(null);
      setError("Failed to initiate payment");
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Initiate Payment</button>
      {responseData && (
        <div>
          <h3>Response from Backend:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default PhonePePayment;

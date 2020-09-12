import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Accept: "application/json",
};
const apiUrl = "http://127.0.0.1:5000";


export const getRequest = async (route) => {
  const response = await axios.get(`${apiUrl}${route}`, {
    headers: headers,
  });

  return response;
};

export const postRequest = async (route, data) => {
  const response = await axios.post(`${apiUrl}${route}`, data, {
    headers: headers,
  });

  return response;
};

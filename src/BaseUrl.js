import axios from "axios";

const language = JSON.parse(window.localStorage.getItem("lang"));

export default axios.defaults.baseURL = "http://15.235.192.7:3000";

export const PostUrl = axios.create({
  baseURL: "http://15.235.192.7:3000/api/user",
  method: "POST",
  headers: {
    "Accept-Language": language,
  },
});

export const GetUrl = axios.create({
  baseURL: "http://15.235.192.7:3000/api/user",
  method: "GET",
  headers: {
    "Accept-Language": language,
  },
});

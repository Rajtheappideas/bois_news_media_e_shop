import axios from "axios";

const language = JSON.parse(window.localStorage.getItem("lang"));

// export default axios.defaults.baseURL = "http://15.235.192.7:3000";
export default axios.defaults.baseURL = "https://api.boisnewsmedia.com";

export const PostUrl = axios.create({
  baseURL: "https://api.boisnewsmedia.com/api/user",
  method: "POST",
  headers: {
    "Accept-Language": language,
  },
});

export const GetUrl = axios.create({
  baseURL: "https://api.boisnewsmedia.com/api/user",
  method: "GET",
  headers: {
    "Accept-Language": language,
  },
});

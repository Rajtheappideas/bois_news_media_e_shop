import axios from "axios";

const language = JSON.parse(window.localStorage.getItem("lang"));

export default axios.defaults.baseURL = "https://api.boisnewsmedia.com";

export const PublicS3Url = "https://boisnewsmedia-assets.s3.eu-west-3.amazonaws.com/";

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

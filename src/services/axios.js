import axios from "axios";

const service = axios.create({
    baseURL: "https://newsapi.org",
});



export default service;
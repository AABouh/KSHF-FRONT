import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: "https://avid-addition-production.up.railway.app",
    headers: {
        "Content-Type": "application/json"
    },
});
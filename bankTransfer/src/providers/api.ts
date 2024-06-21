import axios from "axios";

export const api = axios.create({
    baseURL: "https://bank-transfer-project-y21y.vercel.app/",
});


import axios from "axios";

export const api = axios.create({
    // baseURL: "https://bank-transfer-project-y21y-git-dev-crishard.vercel.app/",
    baseURL: "http://localhost:3000/"
});


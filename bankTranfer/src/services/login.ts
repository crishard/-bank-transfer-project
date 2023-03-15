import { api } from "../providers/api";

export const login = async (username: string, password: string) => {
    const response = await api
        .post("login", {
            username,
            password,
        })
    localStorage.setItem("token", JSON.stringify(response.data));
    return response
};

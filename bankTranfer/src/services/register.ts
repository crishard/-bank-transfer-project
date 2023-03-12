import { api } from "../providers/api";

export const userRegister = async (username: string, password: string) => {

    console.log(username, password)
    await api.post("create_user", {
        username: username,
        password: password,
    })
};


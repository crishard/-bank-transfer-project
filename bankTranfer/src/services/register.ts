import { api } from "../providers/api";

export const userRegister = async (username: string, password: string) => {

    console.log(username, password)
    const response = await api.post("create_user", {
        username: username,
        password: password,
    }).then((res) => {
        const { token } = res.data;
    },
    )
    console.log(response);
    return response;

};


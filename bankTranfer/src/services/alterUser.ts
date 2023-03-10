import { api } from "../providers/api";

export const alterUser = async (username: string, confirmPassword: string, password: string) => {

    const token = localStorage.getItem('token')?.replace(/^"(.+(?="$))"$/, '$1');

    const headerAutorization = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const response = await api
    .put("alter_user", {
        username,
        password,
        confirmPassword,
    }, headerAutorization
    ).then(response => (response.data));

    return {response}
};


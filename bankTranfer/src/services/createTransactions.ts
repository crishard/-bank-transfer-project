
import { api } from "../providers/api";

export const createTransaction = async (value: number, userCashIn: string, password: string) => {

    const token = localStorage.getItem('token')?.replace(/^"(.+(?="$))"$/, '$1');

    const headerAutorization = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const response = await api
        .post("create_transaction", {
            value,
            password,
            userCashIn,
        }, headerAutorization
        ).then(response => (response.data));
        
    return { response }
};


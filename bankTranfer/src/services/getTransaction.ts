import { useEffect, useState } from "react";
import { api } from "../providers/api";


export function getTransaction<T = unknown>() {
    const token = localStorage.getItem('token')?.replace(/^"(.+(?="$))"$/, '$1');

    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        api
            .get("transactions", {
                headers: { Authorization: `Bearer ${token}` }
            }
            ).then(response => setData(response.data));
    }, []);
    return { data }
};


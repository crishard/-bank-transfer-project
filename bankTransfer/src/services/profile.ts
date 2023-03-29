import { useEffect, useState } from "react";
import { api } from "../providers/api";

export function profileData<T = unknown>() {
    const token = localStorage.getItem('token')?.replace(/^"(.+(?="$))"$/, '$1');
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        api.get("user", {
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then((response) => setData(response.data));
    }, []);
    return { data }
};


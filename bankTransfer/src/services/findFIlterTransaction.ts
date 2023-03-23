import { useEffect, useState } from "react";

import { api } from "../providers/api";

export async function getFilterTransaction<T = unknown>(userCashIn?: string, date?: Date) {
    const token = localStorage.getItem('token')?.replace(/^"(.+(?="$))"$/, '$1');
    const headerAutorization = {
        headers: { Authorization: `Bearer ${token}` }
    }

    if (userCashIn == "cashIn") {
        const response = await api.post("filters_transactions",
            {
                findDate: date,
                cashIn: true
            },
            headerAutorization
        );
        return response

    } else if (userCashIn == "cashOut") {

        const response = await api.post("filters_transactions",
            {
                findDate: date,
                cashIn: false
            },
            headerAutorization
        )
        return response

    } else if (userCashIn == "") {
        const response = await api.post("filters_transactions",
            {
                findDate: date,
            },
            headerAutorization
        )
        return response
    }

};


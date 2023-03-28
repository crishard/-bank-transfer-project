import { useState } from "react";
import { CreateTransactionForm } from "../forms/CreateTransactionForm";
import { FindTransactionForm } from "../forms/FindTransactionForm";
import { ViewTransaction } from "../viewTransactions/ViewTransaction";

export function Transaction() {

    const [findTransaction, setFindTransaction] = useState(true);
    return (
        <main>
            <div className="flex gap-16 justify-evenly mt-8 mb-12">
                <ViewTransaction />

                <section className="w-5/12">

                    <div className="text-end text-sm">
                        {findTransaction ?
                            <button className="w-32 font-medium rounded text-white bg-indigo-600 py-2.5 px-4 text-sm" onClick={() => setFindTransaction(false)}>Realize uma transferência</button>
                            :
                            <button className="w-32 font-medium rounded text-white bg-indigo-600 py-2.5 px-4 text-sm" onClick={() => setFindTransaction(true)}>Filtrar Transferências</button>}
                    </div>

                    {findTransaction ? <FindTransactionForm /> : <CreateTransactionForm />}
                </section>

            </div>
        </main>
    )
}
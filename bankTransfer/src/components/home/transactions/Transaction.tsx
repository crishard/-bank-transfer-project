import { useState } from "react";
import { CreateTransactionForm } from "../forms/CreateTransactionForm";
import { FindTransactionForm } from "../forms/FindTransactionForm";
import { ViewTransaction } from "../viewTransactions/ViewTransaction";

export function Transaction() {

    const [findTransaction, setFindTransaction] = useState(true);
    return (
        <section>
            <div className="transaction-operation flex gap-8 justify-evenly mt-8 mb-12">
                <ViewTransaction />

                <div className="form-transaction-grid w-5/12 grid">
                    <div className="button-option text-end text-sm">
                        {findTransaction ?
                            <button className="w-32 font-medium rounded text-white bg-indigo-600 py-2.5 px-4" onClick={() => setFindTransaction(false)}>Realize uma transferência</button>
                            :
                            <button className="w-32 font-medium rounded text-white bg-indigo-600 py-2.5 px-4" onClick={() => setFindTransaction(true)}>Filtrar Transferências</button>}
                    </div>

                    {findTransaction ? <FindTransactionForm /> : <CreateTransactionForm />}
                </div>

            </div>
        </section>
    )
}
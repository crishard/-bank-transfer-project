import { CreateTransactionForm } from "../forms/CreateTransactionForm";
import { FindTransactionForm } from "../forms/FindTransactionForm";
import { ViewTransaction } from "../viewTransactions/ViewTransaction";

export function Transaction() {
    return (
        <main>
            <div className="flex gap-16 justify-evenly mt-8 mb-12">
                <ViewTransaction />
                <FindTransactionForm />
            </div>
                
            <CreateTransactionForm />
        </main>
    )
}
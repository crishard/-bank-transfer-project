import { TransactionForm } from "../forms/transactions/TransactionForm";
import { ViewTransaction } from "../viewTransactions/ViewTransaction";

export function Transaction() {
    return (
        <div className="flex gap-12 justify-evenly">
            <ViewTransaction/>
            <TransactionForm />
        </div>
    )
}
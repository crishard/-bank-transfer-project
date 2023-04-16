import { getTransaction } from "../../../services/getTransaction";
import { Table } from "../tableTransaction/Table";
import { LineTransaction } from "./lineTransaction/LineTransaction";
import "./ViewTransaction.css";

type Repositories = {
    id: string;
    value: number;
    creatAt: string;
    debitedAccountId: String;
    creditedAccountId: String;
}

export function ViewTransaction() {

    const { data } = getTransaction<Repositories[]>();

    return (
        <div className="h-full w-5/12 text-center view-div px-2 rounded">
            <Table data={data} title={"Todas ás movimentações"} />
        </div>
    )
}
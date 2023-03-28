import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { findTransactionValidate } from "../../../schema/findTransaction";
import { MessageError } from "../../Form/messageError/MessageError";
import { ButtonForm } from "../../Form/buttonForm/ButtonForm";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale';
import { addDays } from 'date-fns';
import { useState } from "react";
import { getFilterTransaction } from "../../../services/findFIlterTransaction";

type Repositories = {
    id: string;
    value: number;
    creatAt: string;
    debitedAccountId: String;
    creditedAccountId: String;
}

type FormData = yup.InferType<typeof findTransactionValidate>;
export function FindTransactionForm() {

    registerLocale('ptBR', ptBR)

    const formMethods = useForm<FormData>({
        resolver: yupResolver<any>(findTransactionValidate)
    });

    const { control, register, handleSubmit, formState: { errors } } = formMethods;


    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [endDate, setEndDate] = useState(new Date());

    async function onSubmit(data: FormData) {

        const a = await getFilterTransaction(data.userCashIn, data.date);
        // await findTransaction(data?.date, data?.userCashIn)
        //     .catch((err) => setError(err.response?.data))
        //     .then(() => { setMessage("Sucesso") })
        // onSubmit={handleSubmit(onSubmit)}
    };

    return (
        <div>
            <h2 className="tracking-wider font-bold text-lg text-center mb-3">Filtre sua busca: </h2>
            <div className="find-transaction">

                <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-6'>
                        <select {...register("userCashIn")}>
                            <option key={"no"} value="">Selecione</option>
                            <option key={"CashIn"} value="cashOut">Realizadas</option>
                            <option key={"CashOut"} value="cashIn">Recebidas</option>
                        </select>

                        <div>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field: { onChange, value } }) => (

                                    <DatePicker
                                        className="h-10"
                                        selected={value}
                                        closeOnScroll={true}
                                        placeholderText="Selecione uma Data"
                                        maxDate={addDays(new Date(), 0)}
                                        isClearable={true}
                                        locale="ptBR"
                                        onChange={(date: Date) => onChange(date)} />
                                )}
                            />
                        </div>
                        <ButtonForm text="Buscar" />
                    </form>
                </FormProvider>
            </div>


            {isLoaded ?
                <>
                    {filter && (
                        <div className="mt-8 text-center">
                            <h3 className="tracking-wider text-xl font-bold tracking-tight text-gray-900">Transações Filtradas</h3>
                            <table className="transacoes w-full">
                                <tr>
                                    <th>Data</th>
                                    <th>Valor</th>
                                </tr>

                                {
                                    filter.map((transaction) => {
                                        const date = new Date(transaction.creatAt);
                                        const dataFormatada = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                        return (
                                            <>
                                            <tr key={transaction.id}>
                                                <td className="tracking-wide">{dataFormatada}</td>
                                                <td>R$ {transaction.value}</td>
                                            </tr>
                                            </>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    )
                    }

                    {error && <MessageError text={error} />}
                </>
                : <div  className="flex mt-6 justify-center">
                    <div className="custom-loader"></div>
                    </div>}
        </div>
    )
}
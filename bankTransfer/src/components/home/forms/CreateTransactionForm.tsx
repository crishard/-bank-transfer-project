import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { transactionValidate } from "../../../schema/transactionValidate";
import { MessageError } from "../../Form/messageError/MessageError";
import { ButtonForm } from "../../Form/buttonForm/ButtonForm";
import { createTransaction } from "../../../services/createTransactions";
import { useState } from "react";


type FormData = yup.InferType<typeof transactionValidate>;
export function CreateTransactionForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver<any>(transactionValidate)
    });
    interface ErrorResponse {
        response?: {
            status: number;
        };
    }

    const [error, setError] = useState("");
    const [message, setMessage] = useState("")

    async function onSubmit(data: FormData) {
        await createTransaction(data.value, data.userCashIn, data.password)
            .catch((err) => setError(err.response?.data))
            .then(() => { setMessage("Sucesso") })
    };

    return (
        <section>
            <div>

                <h2 className="tracking-wider font-bold text-lg text-center mb-3">Realizar uma nova Transação</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-6 items-center justify-center'>


                <div>
                    <label htmlFor="userCredit">Nome do usuário a Receber</label>
                    <input onFocus={() => setError("")} id="userCredit" className="input-form " autoComplete="off" placeholder='Usuário a Receber' type='string' {...register("userCashIn")} />
                    <MessageError text={errors.userCashIn?.message} />

                    <label htmlFor="valueTransfer">Valor da transferência</label>
                    <input onFocus={() => setError("")} required id="valueTransfer" className="input-form " autoComplete="off" placeholder='Valor' type='number' {...register("value")} />
                    <MessageError text={errors.value?.message} />
                </div>
                <div>
                    <label htmlFor="passwordTranfer">Digite sua senha para confirmar</label>
                    <input onFocus={() => setError("")} id="passwordTranfer" className="input-form " autoComplete="off" placeholder='Confirm Password' type='password' {...register("password")} />
                    <MessageError text={errors.password?.message} />

                    <div className="mt-2.5">
                        {error ? <MessageError text={error} /> : <p className="font-normal text-base text-rose-700">Verifique se as informações estão corretas</p>}<ButtonForm text="Transferir" />
                    </div>
                </div>
            </form>
        </section>
    )
}
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { transactionValidate } from "../../../schema/transactionValidate";
import { MessageError } from "../../Form/messageError/MessageError";
import { ButtonForm } from "../../Form/buttonForm/ButtonForm";
import { createTransaction } from "../../../services/createTransactions";
import { useEffect, useState } from "react";
import { PoPup } from "../../poPup/PoPup";

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
    const [isLoaded, setIsLoaded] = useState(true);

    async function onSubmit(data: FormData) {
        setIsLoaded(false)
        await createTransaction(data.value, data.userCashIn, data.password)
            .catch((err) => setError(err.response?.data))
            .then(() => { setMessage("Transação Realizada"); window.location.reload() })
        setIsLoaded(true);
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 5000);
    }, []);


    return (
        <div className="create-transaction-div">
            {isLoaded ? <>

                {message && <PoPup text={message} />}
                <div>
                    <h2 className="tracking-wider font-bold text-lg text-center mb-3">Realizar uma nova Transação</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='create-transaction-fom grid grid-cols-2 gap-5'>

                    <div>
                        <div className="py-4">

                            <label htmlFor="userCredit">Nome do usuário a Receber</label>
                            <input onFocus={() => setError("")} id="userCredit" className="input-form " autoComplete="off" placeholder='Usuário a Receber' type='string' {...register("userCashIn")} />
                            <div className="absolute">

                                <MessageError text={errors.userCashIn?.message} />
                            </div>
                        </div>
                        <div className="py-4">

                            <label htmlFor="valueTransfer">Valor da transferência</label>
                            <input onFocus={() => setError("")} required id="valueTransfer" className="input-form " autoComplete="off" placeholder='Valor' type='number' {...register("value")} />
                            <div className="absolute">

                                <MessageError text={errors.value?.message} />
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="py-4">
                            <label htmlFor="passwordTranfer">Digite sua senha: </label>
                            <input onFocus={() => setError("")} id="passwordTranfer" className="input-form " autoComplete="off" placeholder='Confirm Password' type='password' {...register("password")} />
                            <div className="absolute">

                                <MessageError text={errors.password?.message} />
                            </div>
                        </div>

                        <div className="mt-2.5 py-4">
                            {error ? <MessageError text={error} /> : <p className="font-normal text-base text-rose-700">Verifique ás informações</p>}
                            <ButtonForm text="Transferir" />
                        </div>
                    </div>
                </form></>
                :
                <div className="flex mt-6 justify-center">
                    <div className="custom-loader"></div>
                </div>}
        </div>
    )
}
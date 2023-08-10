import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { transactionValidate } from "../../../../schema/transactionValidate";
import { MessageError } from "../../../Form/messageError/MessageError";
import { ButtonForm } from "../../../Form/buttonForm/ButtonForm";
import { createTransaction } from "../../../../services/createTransactions";
import { useState } from "react";
import { PoPup } from "../../../poPup/PoPup";
import { LoaderTransaction } from "../../../loader/Loader";

type FormData = yup.InferType<typeof transactionValidate>;
export function FormTransaction() {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver<any>(transactionValidate)
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
    const [isLoaded, setIsLoaded] = useState(true);

    function reloadPageAfterDelay() {
        setTimeout(() => {
            window.location.reload();
        }, 3500);
    }

    function removePoup() {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }


    async function onSubmit(data: FormData) {
        setIsLoaded(false)
        setMessage("Realizando transferência...");
        await createTransaction(data.value, data.userCashIn, data.password)

            .then(() => {
                setMessage("Transferência realizada, atualizando dados...")
                reset();
                reloadPageAfterDelay();
            }).catch((err) => {
                setError(err.response?.data)
                setMessage(err.response?.data);
                reset();
                removePoup();
            })
        setIsLoaded(true);
    };


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
                            <p className="font-normal text-base text-rose-700">Verifique ás informações</p>
                            <ButtonForm text="Transferir" />
                        </div>
                    </div>
                </form></>
                :
                <>
                    <LoaderTransaction />
                </>
            }
        </div>
    )
}
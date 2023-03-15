import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { transactionValidate } from "../../../../schema/transactionValidate";
import { MessageError } from "../../../Form/messageError/MessageError";
import { ButtonForm } from "../../../Form/buttonForm/ButtonForm";
import { createTransaction } from "../../../../services/createTransactions";


type FormData = yup.InferType<typeof transactionValidate>;
export function TransactionForm() {



    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver<any>(transactionValidate)
    });

    const onSubmit = (data: FormData) => {
            createTransaction(  data.value, data.userCashIn, data.password,)
        
    };

    return (
        <div>


            <h2 className="tracking-wider font-bold text-lg text-center mb-3">Realizar uma nova Transação</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-6'>


                <div>
                    <label htmlFor="userCredit">Nome do usuário a Receber</label>
                    <input id="userCredit" className="input-form " autoComplete="off" placeholder='Usuário a Receber' type='string' {...register("userCashIn")} />
                    <MessageError text={errors.userCashIn?.message} />

                    <label htmlFor="valueTransfer">Valor da transferência</label>
                    <input required id="valueTransfer" className="input-form " autoComplete="off" placeholder='Valor' type='number' {...register("value")} />
                    <MessageError text={errors.value?.message} />
                </div>
                <div>
                    <label htmlFor="passwordTranfer">Digite sua senha para confirmar</label>
                    <input id="passwordTranfer" className="input-form " autoComplete="off" placeholder='Confirm Password' type='password' {...register("password")} />
                    <MessageError text={errors.password?.message} />

                    <div className="mt-2.5">
                        <p className="font-normal text-base text-rose-700">Verifique se as informações estão corretas</p>
                        <ButtonForm text="Transferir" />
                    </div>
                </div>
            </form>
        </div>
    )
}
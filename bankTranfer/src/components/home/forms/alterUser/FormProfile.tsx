import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { alterUSerValidation } from "../../../../schema/alterUserValidation";
import * as yup from "yup";
import { ButtonForm } from "../../../Form/buttonForm/ButtonForm";
import { MessageError } from "../../../Form/messageError/MessageError";


type FormData = yup.InferType<typeof alterUSerValidation>;
export function FormProfile() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver<any>(alterUSerValidation)
    });

    const onSubmit = (data: FormData) => console.log(data);

    return (
        <div>
            <h2 className="font-bold text-lg text-center mb-3 tracking-wider">Alterar informações pessoais</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-6'>
                <div>
                    <input className="input-form " autoComplete="off" placeholder='Novo Username' type='string' {...register("username")} />
                    <MessageError text={errors.username?.message} />
                    <input className="input-form " autoComplete="off" placeholder='Senha' type='password' {...register("password")} />
                    <MessageError text={errors.password?.message} />
                </div>

                <div>
                    <input className="input-form " autoComplete="off" placeholder='Confirmar senha' type='password' {...register("passwordConfirmation")} />
                    <MessageError text={errors.passwordConfirmation?.message} />

                    <div className="mt-2.5">

                        <ButtonForm text="Salvar" />
                    </div>
                </div>

            </form>
        </div>
    )
}
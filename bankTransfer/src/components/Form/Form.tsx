import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UserValidate } from "../../schema/userValidations";
import "./Form.css"
import { MessageError } from "./messageError/MessageError";
import { HeaderForm } from "./herderForm/HeraderForm";
import { ButtonForm } from "./buttonForm/ButtonForm";
import { useState, useEffect } from "react";
import { Loader } from "../loader/Loader";
import { userRegister } from "../../services/register";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login";

type FormData = yup.InferType<typeof UserValidate>;

interface IFormProps {
  register: boolean;
  titleHeader: string;
  optionHeader: string;
}

export function Form(props: IFormProps) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [reqLoaded, setReqLoaded] = useState(false);
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver<any>(UserValidate)
  });

  const [error, setError] = useState("");
  interface ErrorResponse {
    response?: {
      status: number;
    };
  }

  async function onSubmit(data: FormData) {
    setReqLoaded(true)
    try {
      if (props.register) {
        await userRegister(data.username, data.password);
        navigate("/login");
      } else {
        try {
          const response = await login(data.username, data.password);
          if (response.status === 200) {
            navigate("/home");
          }
        } catch (error: unknown) {
          const err = error as ErrorResponse;
          if (err.response?.status === 400) {
            setError("Usuário ou senha inválido");
          } else {
            setError("Ocorreu um erro. Tente novamente mais tarde.");
          }
        }
      }
    } catch (error) {
      setError("Ocorreu um erro. Tente novamente mais tarde.");
    }
    setReqLoaded(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      {isLoaded ?
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 main-form" >
          {reqLoaded && <div className="absolute h-full w-full bg-[#efefef]"><Loader /></div>}
          <div className="px-8 py-8 container-form">
            <HeaderForm title={props.titleHeader} option={props.optionHeader} hrefProp={props.register} />

            <form className="w-full mt-8 form text-center" onSubmit={handleSubmit(onSubmit)}>
              <input onFocus={() => setError("")} className="input-form " autoComplete="off" placeholder='Username' type='string' {...register("username")} />
              <MessageError text={errors.username?.message} />

              <input onFocus={() => setError("")} className="input-form " autoComplete="off" placeholder='Password' type='password' {...register("password")} />
              <MessageError text={errors.password?.message} />
              {error && <MessageError text={error} />}

              {
                props.register ? <ButtonForm text="Enviar" /> : <ButtonForm text="Entrar" />
              }

            </form>
          </div>
        </div > : <Loader />}
    </>
  );
}
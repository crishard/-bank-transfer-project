import { Form } from "../components/Form/Form";

export function RegisterPage(){
    return(
        <main>
            <Form register={true} titleHeader="Cadastre-se" optionHeader="realize login"/>
        </main>
    )
}
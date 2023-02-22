import { Form } from "../../components/Form/Form";

export function LoginPage(){
    return(
        <main>
            <Form register={false} titleHeader="Login" optionHeader="um cadastro"/>
        </main>
    )
}
import { profileData } from "../../services/profile";
import { FormProfile } from "./forms/alterUser/FormProfile"
import { Profile } from "./Profile";


type Repositories = {
    id: string;
    username: string;
    password: string;
}

export function PersonalInformation() {

    const { data } = profileData<Repositories>();

    return (
        <div className="flex mb-12 justify-evenly">

            {data ? <Profile name={data.username} /> : <Profile name={"Jubileu"} />}

            <FormProfile />
        </div>
    )
}
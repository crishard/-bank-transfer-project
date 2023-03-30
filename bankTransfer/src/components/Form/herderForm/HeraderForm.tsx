import { useState } from "react";
import "./HeaderForm.css"
import { OptionLink } from "./LinkHeader";
import { TitleHeader } from "./TitleHeader";

interface IHerderProps {
  title: string;
  option: string;
  hrefProp: boolean;
}

export function HeaderForm(props: IHerderProps) {
  const [redirect, setRedirect] = useState('/');

  return (
    <div className="img-container">
      <img
        src="https://img.freepik.com/psd-gratuitas/cofre-3d-com-moedas-de-ouro_23-2148938918.jpg?t=st=1676987151~exp=1676987751~hmac=17cf066f752c1ededfa73abc116b63e23328e82e9f729255de48b8cb806e60dd"
        alt="Your Company"
      />
      <TitleHeader>{props.title}</TitleHeader>
      <OptionLink option={props.option} hrefProp={props.hrefProp} />
    </div>
  )
}
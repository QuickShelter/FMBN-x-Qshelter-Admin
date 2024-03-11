import { DetailedHTMLProps, HTMLAttributes } from "react";
import logo from "../../../assets/Logo.png";

export default function Logo(props: DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return (
    <img {...props} src={logo} width="150" height="42" alt="" />
  )
}

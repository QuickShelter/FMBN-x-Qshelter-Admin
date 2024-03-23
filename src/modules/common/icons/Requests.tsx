import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";
interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Requests({
  fill = "#70897B",
  active,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;
  return (
    <svg {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1667 4.66659H14.8333C15.7538 4.66659 16.5 5.41278 16.5 6.33325V11.3333C16.5 12.2537 15.7538 12.9999 14.8333 12.9999H13.1667V16.3333L9.83333 12.9999H6.5C6.03976 12.9999 5.6231 12.8134 5.32149 12.5118M5.32149 12.5118L8.16667 9.66659H11.5C12.4205 9.66659 13.1667 8.92039 13.1667 7.99992V2.99992C13.1667 2.07944 12.4205 1.33325 11.5 1.33325H3.16667C2.24619 1.33325 1.5 2.07944 1.5 2.99992V7.99992C1.5 8.92039 2.24619 9.66659 3.16667 9.66659H4.83333V12.9999L5.32149 12.5118Z" stroke={actualFill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Contributions({
  active,
  fill = ColorHelper.darkBlue500,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;

  return (
    <svg {...rest} width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1667 4.50008V2.83341C13.1667 1.91294 12.4205 1.16675 11.5 1.16675H3.16667C2.24619 1.16675 1.5 1.91294 1.5 2.83341V7.83341C1.5 8.75389 2.24619 9.50008 3.16667 9.50008H4.83333M6.5 12.8334H14.8333C15.7538 12.8334 16.5 12.0872 16.5 11.1667V6.16675C16.5 5.24627 15.7538 4.50008 14.8333 4.50008H6.5C5.57953 4.50008 4.83333 5.24627 4.83333 6.16675V11.1667C4.83333 12.0872 5.57953 12.8334 6.5 12.8334ZM12.3333 8.66675C12.3333 9.58722 11.5871 10.3334 10.6667 10.3334C9.74619 10.3334 9 9.58722 9 8.66675C9 7.74627 9.74619 7.00008 10.6667 7.00008C11.5871 7.00008 12.3333 7.74627 12.3333 8.66675Z" stroke={actualFill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

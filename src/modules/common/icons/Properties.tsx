import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Properties({
  active,
  fill = ColorHelper.darkBlue500,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;

  return (
    <svg {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.8333 16.5V3.16667C14.8333 2.24619 14.0871 1.5 13.1667 1.5H4.83333C3.91286 1.5 3.16667 2.24619 3.16667 3.16667V16.5M14.8333 16.5L16.5 16.5M14.8333 16.5H10.6667M3.16667 16.5L1.5 16.5M3.16667 16.5H7.33333M6.5 4.83331H7.33333M6.5 8.16665H7.33333M10.6667 4.83331H11.5M10.6667 8.16665H11.5M7.33333 16.5V12.3333C7.33333 11.8731 7.70643 11.5 8.16667 11.5H9.83333C10.2936 11.5 10.6667 11.8731 10.6667 12.3333V16.5M7.33333 16.5H10.6667" stroke={actualFill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  );
}

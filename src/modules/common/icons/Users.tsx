import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Users({
  active,
  fill = ColorHelper.darkBlue500,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;

  return (
    <svg {...rest} width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3334 4.83333C10.3334 6.67428 8.84103 8.16667 7.00008 8.16667C5.15913 8.16667 3.66675 6.67428 3.66675 4.83333C3.66675 2.99238 5.15913 1.5 7.00008 1.5C8.84103 1.5 10.3334 2.99238 10.3334 4.83333Z" stroke={actualFill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7.00008 10.6667C3.77842 10.6667 1.16675 13.2783 1.16675 16.5H12.8334C12.8334 13.2783 10.2217 10.6667 7.00008 10.6667Z" stroke={actualFill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

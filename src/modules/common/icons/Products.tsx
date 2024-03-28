import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";
interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Products({
  fill = "#70897B",
  active,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;
  return (
    <svg {...rest} width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.16667 13.0085C2.24619 13.0085 1.5 12.2623 1.5 11.3418V3.00846C1.5 2.08799 2.24619 1.3418 3.16667 1.3418H6.5L8.16667 3.00846H11.5C12.4205 3.00846 13.1667 3.75466 13.1667 4.67513V5.50846M3.16667 13.0085H14.8333C15.7538 13.0085 16.5 12.2623 16.5 11.3418V7.17513C16.5 6.25466 15.7538 5.50846 14.8333 5.50846H6.5C5.57953 5.50846 4.83333 6.25466 4.83333 7.17513V11.3418C4.83333 12.2623 4.08714 13.0085 3.16667 13.0085Z" stroke={actualFill} stroke-width="2" stroke-linecap="round" />
    </svg>
  );
}

import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

export default function ChevronDown({
  stroke = ColorHelper.green300,
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg {...rest} width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8332 1.5L6.99984 7.33333L1.1665 1.5" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  );
}

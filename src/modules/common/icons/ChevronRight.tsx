import { SVGAttributes } from "react";

export default function ChevronRight({
  stroke = "#7081A0",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg {...rest} width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.33341L5.66667 6.00008L1 10.6667" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

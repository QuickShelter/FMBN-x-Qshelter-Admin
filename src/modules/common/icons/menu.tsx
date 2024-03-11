import { SVGAttributes } from "react";

export default function Menu({ stroke = "#000000", ...rest }: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg {...rest} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18L20 18" stroke={stroke} stroke-width="2" stroke-linecap="round" />
      <path d="M4 12L20 12" stroke={stroke} stroke-width="2" stroke-linecap="round" />
      <path d="M4 6L20 6" stroke={stroke} stroke-width="2" stroke-linecap="round" />
    </svg>
  );
}

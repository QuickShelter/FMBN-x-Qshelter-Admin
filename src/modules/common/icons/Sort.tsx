import { SVGAttributes } from "react";

export default function Sort({
  stroke = "#70897B",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        d="M2 3.16602H10.6667M2 5.83268H8M2 8.49935H6M8.66667 8.49935L11.3333 5.83268M11.3333 5.83268L14 8.49935M11.3333 5.83268V13.8327"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

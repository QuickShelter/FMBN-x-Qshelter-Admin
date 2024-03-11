import { SVGAttributes } from "react";

export default function ChevronRight({
  stroke = "#7081A0",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.60669 13.6611L10.9534 9.31441C11.4667 8.80107 11.4667 7.96107 10.9534 7.44774L6.60669 3.10107"
        stroke={stroke}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

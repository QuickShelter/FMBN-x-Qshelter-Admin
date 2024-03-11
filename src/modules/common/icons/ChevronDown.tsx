import { SVGAttributes } from "react";

export default function ChevronDown({
  stroke = "#091525",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6 7.95825L11.1667 13.3916C10.525 14.0333 9.47503 14.0333 8.83336 13.3916L3.40002 7.95825"
        stroke={stroke}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

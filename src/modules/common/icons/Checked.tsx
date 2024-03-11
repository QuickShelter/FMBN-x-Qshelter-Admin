import { SVGAttributes } from "react";

export default function Checked({
  fill = "#091525",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.78125" width="20" height="20" rx="4" fill={fill} />
      <path
        d="M5.35742 10.2999L8.77344 13.7159L16.2061 6.2832"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

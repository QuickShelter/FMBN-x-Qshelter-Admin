import { SVGAttributes } from "react";

export default function UnChecked(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.28125"
        y="0.5"
        width="19"
        height="19"
        rx="3.5"
        stroke="#B7C9E3"
      />
    </svg>
  );
}

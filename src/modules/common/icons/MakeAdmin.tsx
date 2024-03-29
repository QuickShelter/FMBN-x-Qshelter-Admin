import { SVGAttributes } from "react";

export default function MakeAdmin({
  fill = "#70897B",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M10 9.5C11.6569 9.5 13 8.15685 13 6.5C13 4.84315 11.6569 3.5 10 3.5C8.34315 3.5 7 4.84315 7 6.5C7 8.15685 8.34315 9.5 10 9.5Z"
        fill={fill}
      />
      <path
        d="M3 18.5C3 14.634 6.13401 11.5 10 11.5C13.866 11.5 17 14.634 17 18.5H3Z"
        fill={fill}
      />
    </svg>
  );
}

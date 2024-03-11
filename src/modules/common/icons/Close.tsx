import { SVGAttributes } from "react";

export default function Close({
  fill = "#7081A0",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M6.4 19.0469L5 17.6469L10.6 12.0469L5 6.44688L6.4 5.04688L12 10.6469L17.6 5.04688L19 6.44688L13.4 12.0469L19 17.6469L17.6 19.0469L12 13.4469L6.4 19.0469Z"
        fill={fill}
      />
    </svg>
  );
}

import { SVGAttributes } from "react";

export default function Check({
  fill = "#B2BCB6",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.2071 5.29289C17.5976 5.68342 17.5976 6.31658 17.2071 6.70711L9.20711 14.7071C8.81658 15.0976 8.18342 15.0976 7.79289 14.7071L3.79289 10.7071C3.40237 10.3166 3.40237 9.68342 3.79289 9.29289C4.18342 8.90237 4.81658 8.90237 5.20711 9.29289L8.5 12.5858L15.7929 5.29289C16.1834 4.90237 16.8166 4.90237 17.2071 5.29289Z"
        fill={fill}
      />
    </svg>
  );
}

import { SVGAttributes } from "react";

export default function Edit({
  fill = "#70897B",
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
        d="M10.869 3.36902C11.4939 2.74418 12.5069 2.74418 13.1318 3.36902C13.7566 3.99386 13.7566 5.00692 13.1318 5.63176L12.4974 6.26608L10.2347 4.00333L10.869 3.36902Z"
        fill={fill}
      />
      <path
        d="M9.10334 5.13471L2.40039 11.8376V14.1004H4.66313L11.3661 7.39745L9.10334 5.13471Z"
        fill={fill}
      />
    </svg>
  );
}

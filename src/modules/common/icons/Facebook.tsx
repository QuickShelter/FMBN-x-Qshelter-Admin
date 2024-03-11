import { SVGAttributes } from "react";

export default function Facebook({
  fill = "#3975EA",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
    >
      <path
        d="M46.3334 24.9998C46.3334 13.4998 37.0001 4.1665 25.5001 4.1665C14.0001 4.1665 4.66675 13.4998 4.66675 24.9998C4.66675 35.0832 11.8334 43.479 21.3334 45.4165V31.2498H17.1667V24.9998H21.3334V19.7915C21.3334 15.7707 24.6042 12.4998 28.6251 12.4998H33.8334V18.7498H29.6667C28.5209 18.7498 27.5834 19.6873 27.5834 20.8332V24.9998H33.8334V31.2498H27.5834V45.729C38.1043 44.6873 46.3334 35.8123 46.3334 24.9998Z"
        fill={fill}
      />
    </svg>
  );
}

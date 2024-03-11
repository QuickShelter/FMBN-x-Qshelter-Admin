import { SVGAttributes } from "react";

export default function Email({
  fill = "#fff",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
    >
      <path
        d="M24.3334 6.50016C24.3334 5.3085 23.3584 4.3335 22.1667 4.3335H4.83341C3.64175 4.3335 2.66675 5.3085 2.66675 6.50016V19.5002C2.66675 20.6918 3.64175 21.6668 4.83341 21.6668H22.1667C23.3584 21.6668 24.3334 20.6918 24.3334 19.5002V6.50016ZM22.1667 6.50016L13.5001 11.9168L4.83341 6.50016H22.1667ZM22.1667 19.5002H4.83341V8.66683L13.5001 14.0835L22.1667 8.66683V19.5002Z"
        fill={fill}
      />
    </svg>
  );
}

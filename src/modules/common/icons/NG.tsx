import { SVGAttributes } from "react";

export default function NG(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 85.5 513 342">
      <path fill="#FFF" d="M0 85.5h513v342H0z" />
      <g fill="#007b23">
        <path d="M0 85.5h171v342H0zM342 85.5h171v342H342z" />
      </g>
    </svg>
  );
}

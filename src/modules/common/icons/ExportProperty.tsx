import { SVGAttributes } from "react";

export default function ExportProperty(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M8.1813 6.32015L16.6713 3.49015C20.4813 2.22015 22.5513 4.30015 21.2913 8.11015L18.4613 16.6002C16.5613 22.3102 13.4413 22.3102 11.5413 16.6002L10.7013 14.0802L8.1813 13.2402C2.4713 11.3402 2.4713 8.23015 8.1813 6.32015Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.8912 13.6496L14.4712 10.0596"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

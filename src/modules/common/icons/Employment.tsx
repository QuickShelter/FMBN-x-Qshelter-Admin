import { SVGAttributes } from "react";

export default function Employment({ ...rest }: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg {...rest} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="2" fill="#D7DED7" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 18V16.5C18 14.0147 20.0147 12 22.5 12H25.5C27.9853 12 30 14.0147 30 16.5V18H33C34.6569 18 36 19.3431 36 21V33C36 34.6569 34.6569 36 33 36H15C13.3431 36 12 34.6569 12 33V21C12 19.3431 13.3431 18 15 18H18ZM22.5 15C21.6716 15 21 15.6716 21 16.5V18H27V16.5C27 15.6716 26.3284 15 25.5 15H22.5Z" fill="#70897B" />
    </svg>

  );
}

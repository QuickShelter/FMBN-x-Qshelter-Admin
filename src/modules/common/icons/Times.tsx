import { SVGAttributes } from "react";

export default function Times({
  fill = "#05150C",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.79289 4.36321C5.18342 3.97268 5.81658 3.97268 6.20711 4.36321L10.5 8.6561L14.7929 4.36321C15.1834 3.97268 15.8166 3.97268 16.2071 4.36321C16.5976 4.75373 16.5976 5.3869 16.2071 5.77742L11.9142 10.0703L16.2071 14.3632C16.5976 14.7537 16.5976 15.3869 16.2071 15.7774C15.8166 16.1679 15.1834 16.1679 14.7929 15.7774L10.5 11.4845L6.20711 15.7774C5.81658 16.1679 5.18342 16.1679 4.79289 15.7774C4.40237 15.3869 4.40237 14.7537 4.79289 14.3632L9.08579 10.0703L4.79289 5.77742C4.40237 5.3869 4.40237 4.75373 4.79289 4.36321Z"
        fill={fill}
      />
    </svg>
  );
}

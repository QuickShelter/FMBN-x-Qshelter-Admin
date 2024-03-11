import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Transactions({
  active,
  fill = ColorHelper.darkBlue500,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;

  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M4.39648 14.3945V17.9945C4.39648 19.9828 8.15729 21.5945 12.7965 21.5945C17.4357 21.5945 21.1965 19.9828 21.1965 17.9945V14.3945C21.1965 16.3828 17.4357 17.9945 12.7965 17.9945C8.15729 17.9945 4.39648 16.3828 4.39648 14.3945Z"
        fill={actualFill}
      />
      <path
        d="M4.39648 8.39453V11.9945C4.39648 13.9828 8.15729 15.5945 12.7965 15.5945C17.4357 15.5945 21.1965 13.9828 21.1965 11.9945V8.39453C21.1965 10.3828 17.4357 11.9945 12.7965 11.9945C8.15729 11.9945 4.39648 10.3828 4.39648 8.39453Z"
        fill={actualFill}
      />
      <path
        d="M21.1965 5.99453C21.1965 7.98276 17.4357 9.59453 12.7965 9.59453C8.15729 9.59453 4.39648 7.98276 4.39648 5.99453C4.39648 4.00631 8.15729 2.39453 12.7965 2.39453C17.4357 2.39453 21.1965 4.00631 21.1965 5.99453Z"
        fill={actualFill}
      />
    </svg>
  );
}

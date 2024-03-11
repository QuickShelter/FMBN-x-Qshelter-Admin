import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Properties({
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.59648 4.79648C5.59648 3.471 6.671 2.39648 7.99648 2.39648H17.5965C18.922 2.39648 19.9965 3.471 19.9965 4.79648V19.1965C20.6592 19.1965 21.1965 19.7337 21.1965 20.3965C21.1965 21.0592 20.6592 21.5965 19.9965 21.5965H16.1965C15.6442 21.5965 15.1965 21.1488 15.1965 20.5965V17.9965C15.1965 17.3337 14.6592 16.7965 13.9965 16.7965H11.5965C10.9337 16.7965 10.3965 17.3337 10.3965 17.9965V20.5965C10.3965 21.1488 9.94877 21.5965 9.39648 21.5965H5.59648C4.93374 21.5965 4.39648 21.0592 4.39648 20.3965C4.39648 19.7337 4.93374 19.1965 5.59648 19.1965V4.79648ZM9.19648 5.99648H11.5965V8.39648H9.19648V5.99648ZM11.5965 10.7965H9.19648V13.1965H11.5965V10.7965ZM13.9965 5.99648H16.3965V8.39648H13.9965V5.99648ZM16.3965 10.7965H13.9965V13.1965H16.3965V10.7965Z"
        fill={actualFill}
      />
    </svg>
  );
}

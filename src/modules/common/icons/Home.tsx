import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Home({
  active,
  fill = ColorHelper.darkBlue500,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;

  return (
    <svg
      {...rest}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6458 2.74796C13.1772 2.27933 12.4174 2.27933 11.9487 2.74796L3.54874 11.148C3.08011 11.6166 3.08011 12.3764 3.54874 12.845C4.01737 13.3136 4.77716 13.3136 5.24579 12.845L5.59727 12.4935V20.3965C5.59727 21.0592 6.13452 21.5965 6.79727 21.5965H9.19727C9.86001 21.5965 10.3973 21.0592 10.3973 20.3965V17.9965C10.3973 17.3337 10.9345 16.7965 11.5973 16.7965H13.9973C14.66 16.7965 15.1973 17.3337 15.1973 17.9965V20.3965C15.1973 21.0592 15.7345 21.5965 16.3973 21.5965H18.7973C19.46 21.5965 19.9973 21.0592 19.9973 20.3965V12.4935L20.3487 12.845C20.8174 13.3136 21.5772 13.3136 22.0458 12.845C22.5144 12.3764 22.5144 11.6166 22.0458 11.148L13.6458 2.74796Z"
        fill={actualFill}
      />
    </svg>
  );
}

import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active?: boolean;
}

export default function Notification({
  active,
  fill = "#05150C",
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;

  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M10 2.23047C6.68632 2.23047 4.00003 4.91676 4.00003 8.23047V11.8163L3.29292 12.5234C3.00692 12.8094 2.92137 13.2395 3.07615 13.6132C3.23093 13.9868 3.59557 14.2305 4.00003 14.2305H16C16.4045 14.2305 16.7691 13.9868 16.9239 13.6132C17.0787 13.2395 16.9931 12.8094 16.7071 12.5234L16 11.8163V8.23047C16 4.91676 13.3137 2.23047 10 2.23047Z"
        fill={actualFill}
      />
      <path
        d="M10 18.2305C8.34315 18.2305 7 16.8873 7 15.2305H13C13 16.8873 11.6569 18.2305 10 18.2305Z"
        fill={actualFill}
      />
    </svg>
  );
}

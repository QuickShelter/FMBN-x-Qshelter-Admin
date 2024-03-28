import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";
interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Organisations({
  fill = "#70897B",
  active,
  ...rest
}: IProps) {
  const actualFill = active ? ColorHelper.darkBlue400 : fill;
  return (
    <svg {...rest} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1558_10615)">
        <path d="M17.5 11.2213C15.1839 12.1588 12.6523 12.6751 10 12.6751C7.34775 12.6751 4.81608 12.1588 2.5 11.2213M13.3333 5.17513V3.50846C13.3333 2.58799 12.5871 1.8418 11.6667 1.8418H8.33333C7.41286 1.8418 6.66667 2.58799 6.66667 3.50846V5.17513M10 10.1751H10.0083M4.16667 16.8418H15.8333C16.7538 16.8418 17.5 16.0956 17.5 15.1751V6.8418C17.5 5.92132 16.7538 5.17513 15.8333 5.17513H4.16667C3.24619 5.17513 2.5 5.92132 2.5 6.8418V15.1751C2.5 16.0956 3.24619 16.8418 4.16667 16.8418Z" stroke={actualFill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1558_10615">
          <rect width="20" height="20" fill="white" transform="translate(0 0.174805)" />
        </clipPath>
      </defs>
    </svg>
  );
}

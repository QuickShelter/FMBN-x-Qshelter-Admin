import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";
interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Requests({
  fill = "#70897B",
  active,
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
        d="M3.19727 5.99766C3.19727 4.67217 4.27178 3.59766 5.59727 3.59766H13.9973C15.3227 3.59766 16.3973 4.67217 16.3973 5.99766V10.7977C16.3973 12.1231 15.3227 13.1977 13.9973 13.1977H11.5973L7.99727 16.7977V13.1977H5.59727C4.27178 13.1977 3.19727 12.1231 3.19727 10.7977V5.99766Z"
        fill={actualFill}
      />
      <path
        d="M18.7973 8.39766V11.5977C18.7973 13.8068 17.0064 15.5977 14.7973 15.5977H12.5914L10.4713 17.7177C10.8071 17.8964 11.1904 17.9977 11.5973 17.9977H13.9973L17.5973 21.5977V17.9977H19.9973C21.3228 17.9977 22.3973 16.9231 22.3973 15.5977V10.7977C22.3973 9.47217 21.3227 8.39766 19.9973 8.39766H18.7973Z"
        fill={actualFill}
      />
    </svg>
  );
}

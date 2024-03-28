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
    <svg {...rest} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.66683 2.50814H3.00016C2.07969 2.50814 1.3335 3.25433 1.3335 4.1748V14.1748C1.3335 15.0953 2.07969 15.8415 3.00016 15.8415H13.0002C13.9206 15.8415 14.6668 15.0953 14.6668 14.1748V4.1748C14.6668 3.25433 13.9206 2.50814 13.0002 2.50814H11.3335M8.00016 1.6748V8.34147M8.00016 8.34147L10.5002 5.84147M8.00016 8.34147L5.50016 5.84147M1.3335 10.0081H3.48832C3.70933 10.0081 3.92129 10.0959 4.07757 10.2522L6.08942 12.2641C6.2457 12.4203 6.45766 12.5081 6.67867 12.5081H9.32165C9.54266 12.5081 9.75463 12.4203 9.91091 12.2641L11.9228 10.2522C12.079 10.0959 12.291 10.0081 12.512 10.0081H14.6668" stroke={actualFill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

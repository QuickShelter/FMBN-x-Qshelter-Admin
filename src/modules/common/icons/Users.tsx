import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active: boolean;
}

export default function Users({
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
        d="M11.5961 7.1957C11.5961 9.18393 9.98432 10.7957 7.99609 10.7957C6.00787 10.7957 4.39609 9.18393 4.39609 7.1957C4.39609 5.20748 6.00787 3.5957 7.99609 3.5957C9.98432 3.5957 11.5961 5.20748 11.5961 7.1957Z"
        fill={actualFill}
      />
      <path
        d="M21.1961 7.1957C21.1961 9.18393 19.5843 10.7957 17.5961 10.7957C15.6079 10.7957 13.9961 9.18393 13.9961 7.1957C13.9961 5.20748 15.6079 3.5957 17.5961 3.5957C19.5843 3.5957 21.1961 5.20748 21.1961 7.1957Z"
        fill={actualFill}
      />
      <path
        d="M16.3111 20.3957C16.3671 20.0038 16.3961 19.6031 16.3961 19.1957C16.3961 17.2335 15.7233 15.4284 14.5958 13.9986C15.4784 13.488 16.5031 13.1957 17.5961 13.1957C20.9098 13.1957 23.5961 15.882 23.5961 19.1957V20.3957H16.3111Z"
        fill={actualFill}
      />
      <path
        d="M7.99609 13.1957C11.3098 13.1957 13.9961 15.882 13.9961 19.1957V20.3957H1.99609V19.1957C1.99609 15.882 4.68238 13.1957 7.99609 13.1957Z"
        fill={actualFill}
      />
    </svg>
  );
}

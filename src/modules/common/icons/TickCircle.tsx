import { SVGAttributes } from "react";

export default function TickCircle({
  fill = "#fff",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M12.7188 2.95312C7.20875 2.95312 2.71875 7.44312 2.71875 12.9531C2.71875 18.4631 7.20875 22.9531 12.7188 22.9531C18.2288 22.9531 22.7188 18.4631 22.7188 12.9531C22.7188 7.44312 18.2288 2.95312 12.7188 2.95312ZM17.4988 10.6531L11.8287 16.3231C11.6887 16.4631 11.4987 16.5431 11.2987 16.5431C11.0988 16.5431 10.9088 16.4631 10.7688 16.3231L7.93875 13.4931C7.64875 13.2031 7.64875 12.7231 7.93875 12.4331C8.22875 12.1431 8.70875 12.1431 8.99875 12.4331L11.2987 14.7331L16.4388 9.59313C16.7288 9.30313 17.2088 9.30313 17.4988 9.59313C17.7888 9.88313 17.7888 10.3531 17.4988 10.6531Z"
        fill={fill}
      />
    </svg>
  );
}

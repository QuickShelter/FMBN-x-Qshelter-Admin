import ColorHelper from "@/helpers/ColorHelper";
import { SVGAttributes } from "react";

interface IProps extends SVGAttributes<HTMLOrSVGElement> {
  active?: boolean;
}

export default function LogOut({
  fill = ColorHelper.darkBlue500,
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.39648 3.5957C5.05923 3.5957 5.59648 4.13296 5.59648 4.7957L5.59648 19.1957C5.59648 19.8584 5.05922 20.3957 4.39648 20.3957C3.73374 20.3957 3.19648 19.8584 3.19648 19.1957L3.19648 4.7957C3.19648 4.13296 3.73374 3.5957 4.39648 3.5957ZM13.645 7.54717C14.1136 8.0158 14.1136 8.7756 13.645 9.24423L12.0935 10.7957L21.1965 10.7957C21.8592 10.7957 22.3965 11.333 22.3965 11.9957C22.3965 12.6584 21.8592 13.1957 21.1965 13.1957L12.0935 13.1957L13.645 14.7472C14.1136 15.2158 14.1136 15.9756 13.645 16.4442C13.1764 16.9129 12.4166 16.9129 11.948 16.4442L8.34796 12.8442C8.12291 12.6192 7.99648 12.314 7.99648 11.9957C7.99648 11.6774 8.12291 11.3722 8.34796 11.1472L11.948 7.54717C12.4166 7.07854 13.1764 7.07855 13.645 7.54717Z"
        fill={actualFill}
      />
    </svg>
  );
}

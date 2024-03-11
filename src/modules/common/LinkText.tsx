import { Link, LinkProps } from "react-router-dom";

export default function LinkText(props: LinkProps) {
  return (
    <Link
      {...props}
      className={`text-app-dark-blue-300 hover:text-app-dark-blue-500 duration-300 ${props.className}`}
    ></Link>
  );
}

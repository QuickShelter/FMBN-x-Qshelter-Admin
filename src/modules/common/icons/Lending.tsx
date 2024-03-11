import { SVGAttributes } from "react";

export default function Lending({
  fill = "#7081A0",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 4.38086H7C4 4.38086 2 5.88086 2 9.38086V12.9409C2 13.3109 2.38 13.5409 2.71 13.3909C3.69 12.9409 4.82 12.7709 6.01 12.9809C8.64 13.4509 10.57 15.8909 10.5 18.5609C10.49 18.9809 10.43 19.3909 10.32 19.7909C10.24 20.1009 10.49 20.3909 10.81 20.3909H17C20 20.3909 22 18.8909 22 15.3909V9.38086C22 5.88086 20 4.38086 17 4.38086ZM12 14.8809C10.62 14.8809 9.5 13.7609 9.5 12.3809C9.5 11.0009 10.62 9.88086 12 9.88086C13.38 9.88086 14.5 11.0009 14.5 12.3809C14.5 13.7609 13.38 14.8809 12 14.8809ZM19.25 14.3809C19.25 14.7909 18.91 15.1309 18.5 15.1309C18.09 15.1309 17.75 14.7909 17.75 14.3809V10.3809C17.75 9.97086 18.09 9.63086 18.5 9.63086C18.91 9.63086 19.25 9.97086 19.25 10.3809V14.3809Z"
        fill={fill}
      />
      <path
        d="M5 14.3809C3.75 14.3809 2.62 14.9709 1.89 15.8709C1.33 16.5609 1 17.4309 1 18.3809C1 20.5909 2.8 22.3809 5 22.3809C6.74 22.3809 8.23 21.2709 8.77 19.7109C8.92 19.3009 9 18.8509 9 18.3809C9 16.1809 7.21 14.3809 5 14.3809ZM7.36 20.1209C7.34 20.1809 7.3 20.2409 7.26 20.2809L6.54 20.9909C6.45 21.0909 6.33 21.1309 6.2 21.1309C6.07 21.1309 5.94 21.0909 5.85 20.9909C5.69 20.8409 5.67 20.6009 5.77 20.4209H3.76C3.12 20.4209 2.6 19.9009 2.6 19.2509V19.1509C2.6 18.8709 2.82 18.6609 3.09 18.6609C3.36 18.6609 3.58 18.8709 3.58 19.1509V19.2509C3.58 19.3609 3.66 19.4509 3.77 19.4509H5.78C5.68 19.2609 5.7 19.0309 5.86 18.8709C6.05 18.6809 6.36 18.6809 6.54 18.8709L7.26 19.5909C7.3 19.6309 7.34 19.6909 7.37 19.7509C7.41 19.8609 7.41 20.0009 7.36 20.1209ZM7.4 17.6109C7.4 17.8909 7.18 18.1009 6.91 18.1009C6.64 18.1009 6.42 17.8909 6.42 17.6109V17.5109C6.42 17.4009 6.34 17.3109 6.23 17.3109H4.23C4.33 17.5009 4.31 17.7309 4.15 17.8909C4.06 17.9809 3.94 18.0309 3.8 18.0309C3.68 18.0309 3.55 17.9809 3.46 17.8909L2.74 17.1709C2.7 17.1309 2.66 17.0709 2.63 17.0109C2.59 16.8909 2.59 16.7609 2.63 16.6409C2.66 16.5909 2.69 16.5209 2.74 16.4809L3.46 15.7709C3.65 15.5709 3.96 15.5709 4.14 15.7709C4.3 15.9209 4.32 16.1609 4.22 16.3409H6.23C6.87 16.3409 7.39 16.8609 7.39 17.5109V17.6109H7.4Z"
        fill={fill}
      />
    </svg>
  );
}

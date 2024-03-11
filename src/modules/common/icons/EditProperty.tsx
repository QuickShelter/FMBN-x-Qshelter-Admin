import { SVGAttributes } from "react";

export default function EditProperty(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M11.7812 2H9.78125C4.78125 2 2.78125 4 2.78125 9V15C2.78125 20 4.78125 22 9.78125 22H15.7812C20.7812 22 22.7812 20 22.7812 15V13"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.8213 3.02025L8.94125 10.9003C8.64125 11.2003 8.34125 11.7903 8.28125 12.2203L7.85125 15.2303C7.69125 16.3203 8.46125 17.0803 9.55125 16.9303L12.5613 16.5003C12.9813 16.4403 13.5713 16.1403 13.8813 15.8403L21.7613 7.96025C23.1213 6.60025 23.7613 5.02025 21.7613 3.02025C19.7613 1.02025 18.1813 1.66025 16.8213 3.02025Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.6913 4.15039C16.3613 6.54039 18.2313 8.41039 20.6313 9.09039"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

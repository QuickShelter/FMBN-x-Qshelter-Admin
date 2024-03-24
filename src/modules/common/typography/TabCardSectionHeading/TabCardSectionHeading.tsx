import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function TabCard({ className, children, ...rest }: IProps) {
    return (
        <h3
            {...rest}
            className={`${className} text-base font-medium leading-6 tracking-tight text-left text-regal-blue-500`}>{children}</h3>
    );
}
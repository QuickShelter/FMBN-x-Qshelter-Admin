import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    shadow?: boolean;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function TabCard({ className, shadow, ...rest }: IProps) {
    return (
        <div
            {...rest}
            className={`${className} p-5 sm:px-8 sm:py-5 card-no-mobile`}
        />
    );
}
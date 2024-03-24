import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from './SemiBold.module.css'

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function TabCard({ className, children, ...rest }: IProps) {
    return (
        <span
            {...rest}
            className={`${className} ${styles.container}`}>{children}</span>
    );
}
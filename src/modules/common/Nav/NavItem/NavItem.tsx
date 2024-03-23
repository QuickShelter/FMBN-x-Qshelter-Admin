import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import styles from './NavItem.module.css'

interface IProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    isActive: boolean
}

export default function NavItem({ className, isActive = false, children, ...rest }: IProps) {
    return (
        <li className={`${styles.container} ${className} 
       ${isActive ? styles.active : ""}`} {...rest}>{children}</li>
    )
}

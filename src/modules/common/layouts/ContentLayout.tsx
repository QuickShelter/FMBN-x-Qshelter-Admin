import { DetailedHTMLProps, HTMLAttributes } from "react";
import Card from "../Card";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export default function ContentLayout({ children, className, ...rest }: IProps) {
    return (
        <Card className={`${className} flex-1 p-0`} {...rest}>
            {children}
        </Card>
    )
}

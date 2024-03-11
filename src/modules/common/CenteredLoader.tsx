import { DetailedHTMLProps, HTMLAttributes } from "react";
import Spinner from "./Spinner";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function CenteredLoader({ size, ...rest }: IProps) {
    return (
        <div {...rest} className="flex flex-1 justify-center items-center"><Spinner size={size} /></div>
    )
}

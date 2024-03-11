import { DetailedHTMLProps, HTMLAttributes, ReactElement, RefObject, forwardRef } from "react";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactElement
}
const ExportWrapper = forwardRef(({ children, className, ...rest }: IProps, ref) => (
    <div {...rest} className={`${className} absolute overflow-hidden`} >
        <div ref={ref as RefObject<HTMLDivElement>} className="absolute right-[-1000px]">
            {children}
        </div>
    </div>
))

export default ExportWrapper
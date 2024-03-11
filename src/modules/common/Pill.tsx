import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export default function Pill({ children, className, ...rest }: IProps) {
    return (
        <div {...rest}
            className={`${className} w-fit flex gap-1 px-3 py-1 bg-zinc-100 rounded-[100px] border border-gray-400 justify-start items-center whitespace-nowrap flex-nowrap`}
        >
            <span className="text-neutral-950 text-sm font-semibold leading-[25.20px]">
                {children}
            </span>
            {/* <div className="bg-none border-none">
          <Times />
        </div> */}
        </div>
    );
}

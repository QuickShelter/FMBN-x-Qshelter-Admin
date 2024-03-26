import Employment from "@/modules/common/icons/Employment";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string | null | undefined,
    employeeCount: number | null,
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function EmployerSummary({ className, name, employeeCount, ...rest }: IProps) {
    return (
        <div
            {...rest}
            className={`${className} flex gap-4`}
        >
            <Employment />
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm text-app-black-400">{name ?? "N/A"}</span>
                <span className="font-normal text-[13px] text-app-green-300">{`${employeeCount ?? "N/A"}`} Employees</span>
            </div>
        </div>
    );
}
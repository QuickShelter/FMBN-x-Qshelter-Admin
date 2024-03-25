import { DetailedHTMLProps, HTMLAttributes } from "react";
import NavSelect from "../NavSelect";
import LinkTabsWithMore from "../LinkTabsWithMore";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    tabs: {
        label: string;
        value: string; //IPropertySaleStatus | IRequestType | ITransactionType | IRole | "";
        link: string;
    }[];
    field: string;
    currentValue: string;
    threshold: number;
    check?: "query" | "path";
    pathDeterminer: (value: string) => string
    defaultPath?: string
}

export default function ResponsiveLinkTab({ tabs, defaultPath, field, currentValue, threshold, pathDeterminer }: IProps) {
    return (
        <>
            <div className="hidden lg:block">
                <LinkTabsWithMore
                    defaultPath={defaultPath}
                    threshold={threshold}
                    className="pt-2 text-[12px] sm:text-sm"
                    field={field}
                    tabs={tabs.map(tab => ({
                        label: tab.label,
                        value: tab.value,
                        link: pathDeterminer(tab.value),
                    }))}
                />
            </div>
            <div className="lg:hidden mt-4">
                <NavSelect currentValue={currentValue} containerClassName="w-full" changePath={pathDeterminer} navs={tabs.map(tab => ({
                    label: tab.label,
                    value: tab.value,
                }))} />
            </div>
        </>
    )
}

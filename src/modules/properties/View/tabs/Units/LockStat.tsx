import FormatHelper from "@/helpers/FormatHelper";
import Progress from "@/modules/common/Progress";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  nLockedUnits: number;
  nUnits: number;
}

export default function LockStat({
  className,
  nUnits,
  nLockedUnits,
  ...rest
}: IProps) {
  return (
    <div {...rest} className={`${className}`}>
      <div className="flex justify-between">
        <div className="text-neutral-500 text-sm font-semibold leading-[16.80px]">
          {FormatHelper.percentageFormatter.format(nLockedUnits / nUnits)}{" "}
          Locked
        </div>
        <div className="text-right text-neutral-950 text-sm font-medium">
          {nLockedUnits} of {nUnits} Units
        </div>
      </div>
      <Progress value={nLockedUnits} max={nUnits} className="w-full" />
    </div>
  );
}

import { DetailedHTMLProps, HTMLAttributes } from "react";
import Times from "./icons/Times";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClick: () => void;
  label: string;
  value: string;
  active: boolean;
}

export default function Pills({ className }: IProps) {
  return (
    <div
      className={`${className} w-fit flex gap-1 px-3 py-1 bg-zinc-100 rounded-[100px] border border-gray-400 justify-start items-center whitespace-nowrap flex-nowrap`}
    >
      <span className="text-neutral-950 text-sm font-semibold leading-[25.20px]">
        24Hrs Security
      </span>
      <button className="bg-none border-none">
        <Times />
      </button>
    </div>
  );
}

import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string;
  texts?: string[];
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function InfoTag({
  className,
  text,
  texts,
  children,
  ...rest
}: IProps) {
  const resolvedContent = useMemo(() => {
    if (text) {
      return text;
    }

    if (texts && texts?.length > 1) {
      return texts.join(" • ");
    }

    if (texts && texts.length === 1) {
      return texts[0];
    }

    return text;
  }, [text, texts]);

  return (
    <div
      {...rest}
      className={`${className} px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] text-neutral-950 text-xs font-medium leading-3 align-middle flex items-center flex-nowrap h-fit w-fit`}
    >
      {resolvedContent}
      {children}
    </div>
  );
}

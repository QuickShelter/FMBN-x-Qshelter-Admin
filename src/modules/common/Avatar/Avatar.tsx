import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import styles from "./Avatar.module.css";
import { IUser } from "@/types";
import Image from "../Image";
import AvatarFallback from "../icons/Avatar";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src?: string | null;
  user?: IUser | null;
  placeholderClassName?: string;
}

/**
 *
 *
 * @param props
 * @returns
 */
export default function AvatarWithSrc(props: IProps) {
  const { user, src, className, placeholderClassName, ...rest } = props;

  const actualDisplay = useMemo(() => {
    if (src) {
      return (
        <Image
          {...rest}
          className={`${className} ${styles.container}`}
          iconClassName="w-[50%] h-[50%]"
          src={src}
          alt=""
        />
      );
    }

    if (user?.avatar) {
      return (
        <Image
          {...rest}
          className={`${className} ${styles.container}`}
          iconClassName="w-[50%] h-[50%]"
          src={user.avatar}
          alt=""
        />
      );
    }

    return (
      <div
        className={`${className} ${placeholderClassName}`}
      >
        <AvatarFallback />
      </div>
    );
  }, [src, user, placeholderClassName, rest, className]);

  return actualDisplay;
}

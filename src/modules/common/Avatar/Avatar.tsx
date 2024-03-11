import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import styles from "./Avatar.module.css";
import { IUser } from "@/types";
import Image from "../Image";

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

  const getAlt = (user?: IUser | null) => {
    if (!user) return "";

    if (user.first_name) return user.first_name[0].toUpperCase();

    if (user.last_name) return user.last_name[0].toUpperCase();

    if (user.email) return user.email[0].toUpperCase();
  };

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
        className={`${className} ${placeholderClassName} ${styles.placeholder}`}
      >
        {getAlt(user)}
      </div>
    );
  }, [src, user, placeholderClassName, rest, className]);

  return actualDisplay;
}

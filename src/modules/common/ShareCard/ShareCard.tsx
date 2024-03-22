import { DetailedHTMLProps, HTMLAttributes } from "react";
import Whatsapp from "../icons/Whatsapp";
import { Link } from "react-router-dom";
import Instagram from "../icons/Instagram";
import Facebook from "../icons/Facebook";
import LinkedIn from "../icons/LinkedIn";
import Email from "../icons/Email";
import X from "../icons/X";
import { IProperty } from "@/types";
import Copy from "../Copy";
import styles from "./ShareCard.module.css";
import { useToastContext } from "@/context/ToastContext_";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  link: string;
  _property: IProperty;
}

export default function ShareCard({
  className,
  link,
  _property: property,
  ...rest
}: IProps) {
  const { pushToast } = useToastContext()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      pushToast({
        type: "success",
        message: "copied",
      })
    } catch (err) {
      pushToast({
        type: "error",
        message: "Unable to copy text to clipboard",
      })
    }
  };
  return (
    <div {...rest} className={`${className} ${styles.container}`}>
      <div className="w-[418px] h-6 text-black text-xl font-bold leading-normal">
        Share
      </div>
      <div className={styles.socials}>
        <div className="flex-col justify-start items-center gap-2 inline-flex">
          <Link
            target="_blank"
            to={`https://wa.me/1234567890?text=${link}`}
            className="w-[50px] h-[50px] p-2.5 bg-green-400 rounded-[50px] justify-center items-center inline-flex"
          >
            <Whatsapp />
          </Link>
          <div className="w-[60px] text-center text-slate-900 text-xs font-normal">
            WhatsApp
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-2 inline-flex">
          <Link target="_blank" to="https://instagram.com" onClick={handleCopy}>
            <Instagram />
          </Link>
          <div className="w-[60px] text-center text-slate-900 text-xs font-normal">
            Instagram
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-2 inline-flex">
          <Link
            target="_blank"
            to={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          >
            <Facebook />
          </Link>
          <div className="w-[60px] text-center text-slate-900 text-xs font-normal">
            Facebook
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-2 inline-flex">
          <Link
            target="_blank"
            to={`https://twitter.com/intent/tweet?text=${link}&hashtags=RealEstate,QuickShelter`}
          >
            <X />
          </Link>
          <div className="w-[60px] text-center text-slate-900 text-xs font-normal">
            X
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-2 inline-flex">
          <Link
            target="_blank"
            to={`https://www.linkedin.com/sharing/share-offsite/?url=${link}`}
            className="w-[50px] h-[50px] p-[11px] bg-blue-700 rounded-[50px] justify-center items-center inline-flex"
          >
            <LinkedIn />
          </Link>
          <div className="w-[60px] text-center text-slate-900 text-xs font-normal">
            LinkedIn
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-2 inline-flex">
          <Link
            to={`mailto:${""}?subject=${property.title}&body=${link}`}
            className="w-[50px] h-[50px] p-3 bg-slate-500 rounded-[50px] justify-center items-center inline-flex"
          >
            <Email />
          </Link>
          <div className="w-[60px] text-center text-slate-900 text-xs font-normal">
            Email
          </div>
        </div>
      </div>
      <Copy text={link} />
    </div>
  );
}

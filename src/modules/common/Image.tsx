import {
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";

import error from "@/assets/error.png";
interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  src?: string | null;
  alt: string;
  loading?: "eager" | "lazy";
  wrapperClassName?: string;
  iconClassName?: string;
}

export default function Image({
  src,
  className,
  wrapperClassName,
  iconClassName,
  loading = "lazy",
  ...rest
}: IProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const actualDisplay = useMemo(() => {
    if (hasError) {
      return (
        <div style={rest.style} className={`${className} flex justify-center items-center bg-app-dark-blue-50/[0.1]`}>
          <img className={`${iconClassName}`} src={error} />
        </div>
      );
    }
    if (src) {
      return (
        <img
          {...rest}
          ref={ref}
          className={`${className} object-cover z-1  ${src && !ref.current?.complete && !imageLoaded
            ? "animate-pulse bg-app-dark-blue-50/[0.1]"
            : ""
            }`}
          loading={loading}
          src={src}
          alt=""
          onLoad={handleImageLoad}
          onError={() => {
            setHasError(true);

            if (ref.current) {
              ref.current.style.display = "none";
            }
          }}
        />
      );
    } else {
      return (
        <div style={rest.style} className={`${className} flex justify-center items-center bg-app-dark-blue-50/[0.1] rounded-4`}>
          <span className="text-app-dark-blue-500 text-center">No Image</span>
        </div >
      );
    }
  }, [hasError, iconClassName, imageLoaded, loading, src, className, rest]);

  return (
    <div
      className={`relative w-fit h-fit ${wrapperClassName}`}
    >
      {actualDisplay}
    </div>
  );
}

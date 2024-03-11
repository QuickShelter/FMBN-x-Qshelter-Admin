import { DetailedHTMLProps, HTMLAttributes, useRef, useEffect } from "react";
import styles from "./ControlledImageSlider.module.css";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import ChevronLeft from "@/modules/common/icons/ChevronLeft";
import ImageHelper from "@/helpers/ImageHelper";
import { IBase64Upload } from "@/types";
import Image from "@/modules/common/Image";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  images: (IBase64Upload | string)[];
  width?: number;
  height?: number;
  setCurrentIndex: (value: number) => void;
  currentIndex: number;
}

/**
 *
 * @param {string[]} props.images Array of image URLs
 * @param {number} props.width Width in pixels
 * @param {number} props.height Height in pixels
 * @param {DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props.rest The remaining args from DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
 * @returns
 */

export default function ImageSlider(props: IProps) {
  const {
    images,
    width = 436,
    currentIndex,
    setCurrentIndex,
    height = 300,
    ...rest
  } = props;

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const left = -currentIndex * width;
    sliderRef.current.style.left = `${left}px`;
  }, [currentIndex, width]);

  return (
    <div
      {...rest}
      className={`${props.className} ${styles.container} rounded-lg`}
      style={{ maxWidth: width }}
    >
      <button
        type="button"
        disabled={currentIndex <= 0}
        onClick={() => setCurrentIndex(currentIndex - 1)}
      >
        <ChevronLeft />
      </button>
      <div
        ref={sliderRef}
        className={styles.slider}
        style={{
          width: width * images.length, // Long enough to hold all images
          height,
        }}
      >
        {
          images.map((image) => {
            const src = ImageHelper.isBase64Upload(image) ? ImageHelper.getSrc(image?.attachment) : ImageHelper.getSrc(image)

            return <Image
              style={{
                width,
                aspectRatio: `${width}/${height}`,
              }}
              className=""
              iconClassName="w-7 h-7 m-auto"
              src={src}
              alt=""
            />
          })
        }
      </div>
      <button
        type="button"
        disabled={currentIndex >= images.length - 1}
        onClick={() => setCurrentIndex(currentIndex + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

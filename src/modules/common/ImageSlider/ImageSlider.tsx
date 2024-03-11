import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";
import styles from "./ImageSlider.module.css";
import imageStyles from "@/module-styles/images.module.css";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import ChevronLeft from "@/modules/common/icons/ChevronLeft";
import Image from "../Image";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  images: Array<{ url: string }>;
  width?: number;
  height?: number;
}

const getNumber = (value: string) => {
  return Number(value.replace("px", "")) ?? 0;
};

/**
 *
 * @param {string[]} props.images Array of image URLs
 * @param {number} props.width Width in pixels
 * @param {number} props.height Height in pixels
 * @param {DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props.rest The remaining args from DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
 * @returns
 */

export default function ImageSlider(props: IProps) {
  const { images, width = 436, height = 300, ...rest } = props;
  const [canGoLeft, setCangoLeft] = useState(false);
  const [canGoRight, setCangoRight] = useState(images.length > 1);

  const sliderRef = useRef<HTMLDivElement>(null);

  const slideRight = () => {
    if (!sliderRef.current) return;

    const left = getNumber(sliderRef.current.style.left);

    if (left <= -(images.length - 1) * width) {
      setCangoRight(false);
      return;
    }

    const newLeft = left - width;
    sliderRef.current.style.left = `${newLeft}px`;
    setCangoLeft(true);

    if (newLeft <= -(images.length - 1) * width) {
      setCangoRight(false);
    }
  };

  const slideLeft = () => {
    if (!sliderRef.current) {
      setCangoLeft(false);
      return;
    }

    const left = getNumber(sliderRef.current.style.left);

    if (left === 0) return;

    const newLeft = left + width;
    sliderRef.current.style.left = `${newLeft}px`;
    setCangoRight(true);

    if (newLeft === 0) {
      setCangoLeft(false);
    }
  };

  return (
    <div
      {...rest}
      className={`${props.className} ${styles.container}`}
      style={{ maxWidth: width }}
    >
      <button type="button" disabled={!canGoLeft} onClick={slideLeft}>
        <ChevronLeft />
      </button>
      <div ref={sliderRef} className={styles.slider}>
        {images.map((image) => (
          <div
            className={styles.imagePositioner}
            style={{ width, aspectRatio: `${width}/${height}`, height }}
          >
            <Image
              style={{
                width,
                aspectRatio: `${width}/${height}`,
              }}
              className={imageStyles.skeleton}
              src={image?.url}
              alt=""
            />
          </div>
        ))}
      </div>
      <button type="button" disabled={!canGoRight} onClick={slideRight}>
        <ChevronRight />
      </button>
    </div>
  );
}

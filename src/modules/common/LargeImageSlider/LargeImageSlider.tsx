import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";
import styles from "./LargeImageSlider.module.css";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import ChevronLeft from "@/modules/common/icons/ChevronLeft";
import Modal from "../Modal";
import ImageSlider from "@/modules/common/ImageSlider";
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

const FLEX_GAP = 16;
const ADJUSTMENT = FLEX_GAP / 2;

/**
 * 
 * @param props 
 * @returns 
 * 
 * @example 
 * <LargeImageSlider
        images={[
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/220px-Townhouses_in_Victoria_Australia.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/220px-Townhouses_in_Victoria_Australia.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/220px-Townhouses_in_Victoria_Australia.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/220px-Townhouses_in_Victoria_Australia.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/220px-Townhouses_in_Victoria_Australia.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/220px-Townhouses_in_Victoria_Australia.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/220px-Townhouses_in_Victoria_Australia.jpg",
        ].map((value) => ({ url: value }))}
      />
 */
export default function LargeImageSlider(props: IProps) {
  const { images, width = 300, height = 200, ...rest } = props;
  const [canGoLeft, setCangoLeft] = useState(false);
  const [canGoRight, setCangoRight] = useState(images.length > 1);

  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideRight = () => {
    if (!sliderRef.current) return;

    const left = getNumber(sliderRef.current.style.left);

    if (left <= -(images.length - 1) * width) {
      setCangoRight(false);
      return;
    }

    if (!containerRef.current || !sliderRef.current) {
      return;
    }

    const containerRight = containerRef.current?.getBoundingClientRect().right;
    const sliderRight = sliderRef.current?.getBoundingClientRect().right;

    if (sliderRight <= containerRight) {
      setCangoLeft(true);
      return;
    }

    let delta = width / 2 + ADJUSTMENT;

    delta = Math.min(sliderRight - containerRight, delta);

    const newLeft = left - delta;
    sliderRef.current.style.left = `${newLeft}px`;
    setCangoLeft(true);

    // console.log({
    //   left: newLeft,
    //   width: -(images.length - 1) * width,
    //   actualWidth: sliderRef.current.getBoundingClientRect().width,
    //   sliderRight: sliderRef.current.getBoundingClientRect().right,
    //   containerRight: containerRef.current?.getBoundingClientRect().right,
    // });

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

    let delta = width / 2 + ADJUSTMENT;

    delta = Math.min(delta, -left);
    // console.log({
    //   delta,
    //   left,
    // });

    const newLeft = left + delta;
    sliderRef.current.style.left = `${newLeft}px`;
    setCangoRight(true);

    if (newLeft >= 0) {
      setCangoLeft(false);
    }
  };

  const [showImage, setShowImage] = useState(false);

  return (
    <div
      {...rest}
      ref={containerRef}
      className={`${props.className} ${styles.container}`}
    >
      <Modal
        closeFormClassName="h-0"
        closeBtnClassName="bg-[white] w-[2rem] mr-4 mt-4 rounded-full h-[2rem] p-0 aspect-square"
        className=""
        show={showImage}
        onCancel={() => setShowImage(false)}
      >
        <ImageSlider className="" images={images} />
      </Modal>
      <button type="button" disabled={!canGoLeft} onClick={slideLeft}>
        <ChevronLeft />
      </button>
      <div
        ref={sliderRef}
        className={styles.slider}
        style={{
          width: "fit-content"
        }}
      >
        {images.map((image) => (
          <div
            className={`${styles.imagePositioner}`}
            style={{
              width,
              aspectRatio: `${width}/${height}`,
              height,
            }}
          >
            <Image
              style={{
                width,
                aspectRatio: `${width}/${height}`,
              }}
              onClick={() => setShowImage(true)}
              iconClassName="w-7 h-7 m-auto"
              className="rounded-3xl"
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

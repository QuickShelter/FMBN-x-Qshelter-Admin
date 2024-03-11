import { SVGAttributes } from "react";

export default function PaperClip({
  stroke = "#006AFF",
  ...rest
}: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M8.72012 8.60001L7.07345 10.2467C6.16012 11.16 6.16012 12.6333 7.07345 13.5467C7.98678 14.46 9.46012 14.46 10.3735 13.5467L12.9668 10.9533C14.7868 9.13334 14.7868 6.17334 12.9668 4.35334C11.1468 2.53334 8.18678 2.53334 6.36678 4.35334L3.54012 7.18001C1.98012 8.74001 1.98012 11.2733 3.54012 12.84" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

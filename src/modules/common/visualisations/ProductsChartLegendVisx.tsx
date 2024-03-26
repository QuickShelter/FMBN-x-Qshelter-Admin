import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";

export type dataPoint = { key: string; percentage: number; color: string };

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorScale: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  infoScale: any;
}

const legendGlyphSize = 10;

export default function ProductsChartLegendVisx({
  infoScale,
  colorScale,
}: IProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBlock: "0",
      }}
    >
      <LegendOrdinal
        scale={colorScale}
        direction="column-reverse"
        itemDirection="row-reverse"
        labelMargin="0 20px 0 0"
        shapeMargin="1px 0 0"
      >
        {(labels) =>
          labels.reverse().map((label, i) => (
            <LegendItem key={`legend-quantile-${i}`} margin="1px 0">
              <svg width={legendGlyphSize} height={legendGlyphSize}>
                <circle
                  fill={label.value}
                  r={legendGlyphSize / 2}
                  cx={legendGlyphSize / 2}
                  cy={legendGlyphSize / 2}
                />
              </svg>
              <LegendLabel className="text-[15px] flex gap-3" align="left" margin="2px 0 0 10px">
                {label.text}<span className="font-semibold ml-auto">{infoScale(label.text)}%</span>
              </LegendLabel>
            </LegendItem>
          ))
        }
      </LegendOrdinal>
    </div>
  );
}

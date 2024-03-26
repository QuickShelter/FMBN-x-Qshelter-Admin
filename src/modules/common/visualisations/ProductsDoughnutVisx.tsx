import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { Text } from "@visx/text";
import { useState } from "react";
import ColorHelper from "@/helpers/ColorHelper";
import FormatHelper from "@/helpers/FormatHelper";

export type ICategoriesChartDataPoint = {
    key: string;
    value: number | null | undefined;
    color: string;
};

interface IProps {
    data: ICategoriesChartDataPoint[];
    increment: number;
    padding: number;
    outerRadius: number;
}

export default function ProductsDoughnutVisx({ data, increment = 5 }: IProps) {
    const [active, setActive] = useState<ICategoriesChartDataPoint | null>();

    return (
        <ParentSize>
            {({ width }) => (
                <svg width={width} height={width}>
                    <Group top={width / 2} left={width / 2}>
                        <Pie
                            data={data}
                            pieValue={(data) => data && data.value && data.value !== null ? data.value : 0}
                            innerRadius={width / 2 - 30}
                            outerRadius={({ data }) => {
                                const outerRadius = width / 2 - 10;
                                return (active && active?.key) === data.key
                                    ? outerRadius + increment
                                    : outerRadius;
                            }}
                        //padAngle={0.01}
                        >
                            {(pie) => {
                                return pie.arcs.map((arc) => {
                                    return (
                                        <g
                                            key={arc.data.key}
                                            onMouseEnter={() => {
                                                setActive(arc.data);
                                            }}
                                            onMouseLeave={() => {
                                                setActive(null);
                                            }}
                                        >
                                            <path
                                                d={pie?.path(arc) ?? undefined}
                                                fill={arc?.data?.color}
                                            ></path>
                                        </g>
                                    );
                                });
                            }}
                        </Pie>
                        <Text
                            fontSize="20px"
                            textAnchor="middle"
                            //fill={active?.color}
                            fill={ColorHelper.darkBlue400}
                        >
                            {active
                                ? `${FormatHelper.numberFormatter.format(active.value && active.value !== null ? active.value : 0)}%`
                                : ""}
                        </Text>
                    </Group>
                </svg>
            )}
        </ParentSize>
    );
}

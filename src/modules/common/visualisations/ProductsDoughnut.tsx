
// import { IDoughnutStats } from '@/types';
// import { useMemo, useState } from 'react';
// import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Cell } from 'recharts';
// import { PieSectorDataItem } from 'recharts/types/polar/Pie';
// import { ActiveShape } from 'recharts/types/util/types';
// import { useWindowSize } from "@uidotdev/usehooks";

// const data: IDoughnutStats[] = [
//     { label: 'Group A', value: 400 },
//     { label: 'Group B', value: 300 },
//     { label: 'Group C', value: 300 },
//     { label: 'Group D', value: 200 },
// ];

// interface IDataPoint { value: string, type: string, id: string }
// type IPayload = IDataPoint[]

// const legendPayload: IPayload = [
//     {
//         id: 'Group A',
//         type: 'square',
//         value: ''
//     },
//     {
//         id: 'Group B',
//         type: 'square',
//         value: 'Group A'
//     },
//     {
//         id: 'Group C',
//         type: 'square',
//         value: 'Group A'
//     },
// ]

// const fillMap: Record<string, string> = {
//     "Group A": "#D1505F",
//     "Group B": "#679CF5",
//     "Group C": "#94C676",
//     "Group D": "#F7CB45",
//     "Group E": "#9962D8",
// }


// const renderActiveShape: ActiveShape<PieSectorDataItem> = (props: PieSectorDataItem) => {

//     const RADIAN = Math.PI / 180;
//     const { cx = 1, cy = 1, midAngle = 1, innerRadius, outerRadius = 1, startAngle, endAngle, payload: _payload, percent = 100, value } = props;
//     const payload = _payload as unknown as IDoughnutStats
//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);
//     const sx = cx + (outerRadius + 10) * cos;
//     const sy = cy + (outerRadius + 10) * sin;
//     const mx = cx + (outerRadius + 30) * cos;
//     const my = cy + (outerRadius + 30) * sin;
//     const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//     const ey = my;
//     const textAnchor = cos >= 0 ? 'start' : 'end';
//     const actualFill = fillMap[(payload.label as string)]

//     return (
//         <g>
//             <text x={cx} y={cy} dy={8} textAnchor="middle" fill={actualFill}>
//                 {payload.label}
//             </text>
//             <Sector
//                 cx={cx}
//                 cy={cy}
//                 innerRadius={innerRadius}
//                 outerRadius={outerRadius}
//                 startAngle={startAngle}
//                 endAngle={endAngle}
//                 fill={actualFill}
//             />
//             <Sector
//                 cx={cx}
//                 cy={cy}
//                 startAngle={startAngle}
//                 endAngle={endAngle}
//                 innerRadius={outerRadius + 6}
//                 outerRadius={outerRadius + 10}
//                 fill={actualFill}
//             />
//             <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={actualFill} fill="none" />
//             <circle cx={ex} cy={ey} r={2} fill={actualFill} stroke="none" />
//             <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
//             <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
//                 {`(${(percent * 100).toFixed(2)}%)`}
//             </text>
//         </g>
//     );
// };

// interface IOrientation {
//     align: 'center' | 'left' | 'right',
//     layout: 'centric' | 'horizontal' | 'radial' | 'vertical',
//     legendVerticalAlign: 'bottom' | 'middle' | 'top'
// }

// export default function () {
//     const [activeIndex, setActiveIndex] = useState(0)

//     const onPieEnter = (_: string, index: number) => {
//         setActiveIndex(index)
//     };

//     const { width } = useWindowSize()
//     const THRESHOLD = 600

//     const resolveOrientation: IOrientation = useMemo(() => {
//         const orientation: IOrientation = {
//             align: 'right',
//             layout: 'vertical',
//             legendVerticalAlign: 'middle'
//         }

//         if (!width) {
//             return orientation
//         }

//         if (width < THRESHOLD) {
//             orientation.align = 'left'
//             orientation.layout = 'centric'
//             orientation.legendVerticalAlign = 'bottom'
//         }

//         return orientation
//     }, [width])

//     return (
//         <ResponsiveContainer width="100%" height="100%">
//             <PieChart width={400} height={300}>
//                 <Legend
//                     verticalAlign={resolveOrientation.legendVerticalAlign}
//                     align={resolveOrientation.align}
//                     layout={resolveOrientation.layout}
//                     iconType='circle'
//                     formatter={(value, entry) => <span className='' style={{ color: `#05150C` }}>{`${(entry.payload as unknown as IDoughnutStats)?.label} ${value}`}</span>}
//                     height={36}
//                 />
//                 <Pie
//                     activeIndex={activeIndex}
//                     activeShape={renderActiveShape}
//                     data={data}
//                     cx={(width && width < THRESHOLD) ? "50%" : "30%"}
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     onMouseEnter={onPieEnter}
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={fillMap[entry.label]} />
//                     ))}
//                 </Pie>
//             </PieChart>
//         </ResponsiveContainer>
//     );
// }

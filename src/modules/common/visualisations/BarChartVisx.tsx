//import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import useMeasure from 'react-use-measure'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Group } from '@visx/group'
import { Axis, TickLabelProps } from '@visx/axis'
import { GridRows } from '@visx/grid';
import { Bar } from '@visx/shape'
import { arrayOf, number, shape, string, func } from 'prop-types'
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { timeParse, timeFormat } from 'd3-time-format'
import { useParentSize } from '@visx/responsive';

const MARGIN = 32
const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 100
const BREAKPOINT = 600
const ALLOWANCE = 50

export interface IData {
    date: string,
    close: number
}

interface IProps {
    data: IData[]
    width?: number
    height?: string | number
    defaultBarWidth?: number
    accessor: {
        xAccessor: (d: IData) => string,
        yAccessor: (d: IData) => number,
    }
}

//const data = appleStock.slice(0, 5)

/**
 * @example
 * 
 * import appleStock from '@visx/mock-data/lib/mocks/appleStock'
 * 
 * const data = appleStock.slice(0, 22) // End exclusive
 *   const accessors = {
    xAccessor: (d) => new Date(d.date).toLocaleDateString(),
    yAccessor: (d) => d.close,
  }

   <div style={{ position: 'relative', height: '500px' }}>
        <BarChart width={500} accessor={accessors} data={data} />
      </div>
 * @returns 
 */
function BarChartVisx({ data, width, height = 500, accessor, defaultBarWidth = 40 }: IProps) {
    const [ref, bounds] = useMeasure()
    const { width: resWidth, parentRef } = useParentSize({ debounceTime: 150 });
    console.log(resWidth)
    let tooltipTimeout = 0
    const tooltipStyles = {
        ...defaultStyles,
        minWidth: 60,
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white',
    }

    const { TooltipInPortal } = useTooltipInPortal({
        // TooltipInPortal is rendered in a separate child of <body /> and positioned
        // with page coordinates which should be updated on scroll. consider using
        // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
        scroll: true,
    })

    const responsiveWidth = bounds.width || DEFAULT_WIDTH
    const responsiveHeight = bounds.height || DEFAULT_HEIGHT

    const innerWidth = responsiveWidth - MARGIN
    const innerHeight = responsiveHeight - MARGIN

    // Selectors
    const getXValue = accessor.xAccessor
    const getYValue = accessor.yAccessor

    // Scales
    const xScale = scaleBand({
        range: [MARGIN, innerWidth],
        domain: data.map(getXValue),
        padding: 0.2,
    })

    const yScale = scaleLinear({
        range: [innerHeight, MARGIN],
        domain: [
            Math.min(...data.map(getYValue)) - 1,
            Math.max(...data.map(getYValue)) + 1,
        ],
        //padding: 0.2,
    })
    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip,
    } = useTooltip()

    const parseDate = timeParse('%Y-%m-%d')
    const format = timeFormat('%b %d')
    const formatDate = (dateString: string) => {
        const date = parseDate(dateString)

        if (!date) return

        return format(date)
    }

    const tickLabelProps: TickLabelProps<string> = () => {
        return {
            fontSize: 8,
            fill: '#545453',
            fontFamily: "sans-serif",
            textAnchor: "start",
            angle: 45,
            dy: "-10px"
        }
    };

    return (
        <div ref={parentRef}>
            <svg
                ref={ref}
                width={width ?? '100%'}
                height={height ?? `calc(100% - ${MARGIN}px)`}
                viewBox={`0 0 ${responsiveWidth} ${responsiveHeight}`}>
                <Group>
                    <GridRows left={MARGIN} scale={yScale} width={innerWidth - (MARGIN)} height={height} stroke="#E7EEE7" />
                    {data.map((d) => {
                        const xValue = accessor.xAccessor(d)
                        const barWidth = Math.min(defaultBarWidth, xScale.bandwidth())
                        //const barWidth = defaultBarWidth
                        const barHeight = innerHeight - (yScale(accessor.yAccessor(d)) ?? 0)

                        const barX = xScale(xValue)
                        const barY = innerHeight - barHeight

                        return (
                            <Bar
                                key={`bar-${xValue}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                className='cursor-pointer'
                                height={barHeight}
                                fill="#5086EC"
                                onClick={() => {
                                    alert(`clicked: ${JSON.stringify(d)}`)
                                }}
                                onMouseLeave={() => {
                                    tooltipTimeout = window.setTimeout(() => {
                                        hideTooltip()
                                    }, 300)
                                }}
                                onMouseMove={(event) => {
                                    if (tooltipTimeout) clearTimeout(tooltipTimeout)
                                    // TooltipInPortal expects coordinates to be relative to containerRef
                                    // localPoint returns coordinates relative to the nearest SVG, which
                                    // is what containerRef is set to in this example.
                                    //const eventSvgCoords = localPoint(event)
                                    const left = Number(event.clientX) - barWidth
                                    showTooltip({
                                        tooltipData: d,
                                        tooltipTop: event?.clientY - ALLOWANCE,
                                        tooltipLeft: left,
                                    })
                                }}
                            />
                        )
                    })}
                </Group>
                <Group>
                    <Axis
                        orientation='bottom'
                        hideAxisLine={false}
                        stroke='#E7EEE7'
                        hideTicks={true}
                        tickTransform={`translate(-${resWidth / ALLOWANCE}, 0)`}
                        top={innerHeight}
                        tickLabelProps={resWidth < BREAKPOINT ? tickLabelProps : undefined}
                        //left={-(MARGIN / 2)}
                        //left={0}
                        tickFormat={(data) => {
                            const format = timeFormat('%b %d')
                            return format(new Date(data))
                        }}
                        scale={xScale}
                        numTicks={Math.floor(data.length)}
                    />
                </Group>
                <Group>
                    <Axis
                        orientation='left'
                        hideAxisLine={true}
                        hideTicks={true}
                        left={MARGIN * (0.8)}
                        scale={yScale}
                    //label={'Value'}
                    />
                </Group>
            </svg>
            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}>
                    <div style={{ color: '#ffffff' }}>
                        <strong>{accessor.yAccessor(tooltipData as IData)}</strong>
                    </div>
                    <div>
                        <small>{formatDate(accessor.xAccessor(tooltipData as IData))}</small>
                    </div>
                </TooltipInPortal>
            )}
        </div>
    )
}

BarChartVisx.propTypes = {
    data: arrayOf(
        shape({
            Symbol: string,
            value: number,
            color: string,
        })
    ),
    width: string,
    height: string,
    accessor: shape({
        x: func,
        y: func,
    }),
}

export default BarChartVisx
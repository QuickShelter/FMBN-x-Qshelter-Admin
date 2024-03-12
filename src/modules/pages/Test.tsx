import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import BarChartVisx, { IData } from '../common/visualisations/BarChartVisx';

export default function Test() {

  const data = appleStock.slice(0, 10) // End exclusive
  const accessors = {
    xAccessor: (d: IData) => new Date(d.date).toLocaleDateString(),
    yAccessor: (d: IData) => d.close,
  }
  return <div className="">
    <div style={{ height: '500px' }}>
      <div className='mb-10'>
        <BarChartVisx accessor={accessors} data={data} />
      </div>
    </div>
  </div>;
}

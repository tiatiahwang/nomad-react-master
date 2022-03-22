import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId!),
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [
                new Date(price.time_open).getTime(),
                price.open > 100
                  ? price.open.toFixed(0)
                  : price.open.toFixed(6),
                price.high > 100
                  ? price.high.toFixed(0)
                  : price.high.toFixed(6),
                price.low > 100 ? price.low.toFixed(0) : price.low.toFixed(6),
                price.close > 100
                  ? price.close.toFixed(0)
                  : price.close.toFixed(6),
              ]) as [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#EE5879',
                  downward: '#96DF6C',
                },
              },
            },
            chart: {
              height: 500,
              width: 500,
              background: 'transparent',
              toolbar: {
                show: false,
              },
            },
            grid: {
              borderColor: '#f7f7f5',
            },
            yaxis: {
              labels: {
                formatter: (value) =>
                  value > 100 ? `$${value.toFixed(0)}` : `$${value.toFixed(6)}`,
              },
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: 'datetime',
            },
          }}
        />
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: 'price',
        //       data: data?.map((price) => price.close) as number[],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: 'dark',
        //     },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: 'transparent',
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     stroke: {
        //       curve: 'smooth',
        //       width: 3,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisTicks: {
        //         show: false,
        //       },
        //       axisBorder: {
        //         show: false,
        //       },
        //       labels: {
        //         show: false,
        //       },
        //       type: 'datetime',
        //       categories: data?.map((price) => price.time_close),
        //     },
        //     fill: {
        //       type: 'gradient',
        //       gradient: {
        //         gradientToColors: ['#0be881'],
        //         stops: [0, 100],
        //       },
        //     },
        //     colors: ['#0fbcf9'],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$ ${value.toFixed(3)}`,
        //       },
        //     },
        //   }}
        // />
      )}
    </div>
  );
}

export default Chart;

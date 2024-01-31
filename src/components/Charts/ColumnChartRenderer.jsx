import { ResponsiveBar } from '@nivo/bar';
import { useWindowSize } from '../../hooks/windowSize';
import { useEffect, useState } from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ColumnChartRenderer = ({ data /* see data tab */ }) => {
  const { height, width } = useWindowSize();
  const [fontSize, setFontSize] = useState(22);
  const [legendPosition, setLegendPosition] = useState('bottom-right');

  useEffect(() => {
    if (width >= 1024) {
      setFontSize(22);
      setLegendPosition('bottom-right');
    } else if (width >= 800) {
      setFontSize(18);
      setLegendPosition('bottom-right');
    } else if (width >= 600) {
      setFontSize(14);
      setLegendPosition('bottom');
    } else {
      setFontSize(12);
      setLegendPosition('bottom');
    }
  }, [height, width]);

  return (
    <div className="flex lg:min-h-[550px] md:min-h-[450px] min-h-[400px] max-h-full max-w-full text-black">
      <ResponsiveBar
        data={data}
        theme={{
          text: {
            fontSize: fontSize * 0.85,
            fill: '#ffff00',
            outlineWidth: 1,
            outlineColor: 'transparent',
          },
        }}
        keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderRadius={5}
        borderWidth={2}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 40,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -50,
          truncateTickAt: 0,
        }}
        labelSkipWidth={11}
        labelSkipHeight={14}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 4,
            itemsSpacing: 3,
            itemWidth: 96,
            itemHeight: 28,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 23,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        motionConfig="gentle"
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }
      />
    </div>
  );
};

export default ColumnChartRenderer;

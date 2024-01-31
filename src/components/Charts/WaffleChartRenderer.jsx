import { ResponsiveWaffle } from '@nivo/waffle';
import { useWindowSize } from '../../hooks/windowSize';
import { useEffect, useState } from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const WaffleChartRenderer = ({ data /* see data tab */ }) => {
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
      <ResponsiveWaffle
        data={data}
        theme={{
          text: {
            fontSize: fontSize * 0.85,
            fill: '#ffff00',
            outlineWidth: 1,
            outlineColor: 'transparent',
          },
        }}
        total={100}
        rows={18}
        columns={14}
        padding={1}
        valueFormat=".2f"
        margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
        colors={{ scheme: 'category10' }}
        borderRadius={3}
        borderColor={{
          from: 'color',
          modifiers: [['darker', '2.8']],
        }}
        motionStagger={2}
        legends={[
          {
            anchor: 'left',
            direction: 'column',
            justify: false,
            translateX: -75,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#fffc00',
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                  itemBackground: '#f7fafb',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default WaffleChartRenderer;

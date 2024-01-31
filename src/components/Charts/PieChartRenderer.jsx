import { ResponsivePie } from '@nivo/pie';
import { useWindowSize } from '../../hooks/windowSize';
import { useEffect, useState } from 'react';

const PieChartRenderer = ({ data }) => {
  const { height, width } = useWindowSize();
  const [fontSize, setFontSize] = useState(22);

  useEffect(() => {
    if (width >= 1024) {
      setFontSize(22);
    } else if (width >= 800) {
      setFontSize(18);
    } else if (width >= 600) {
      setFontSize(14);
    } else {
      setFontSize(12);
    }
  }, [height, width]);

  return (
    <div className="flex lg:min-h-[550px] md:min-h-[450px] min-h-[400px] max-h-full max-w-full text-black">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        theme={{
          text: {
            fontSize: fontSize,
            fill: '#333333',
            outlineWidth: 1,
            outlineColor: 'transparent',
          },
        }}
        innerRadius={0.2}
        padAngle={5}
        cornerRadius={7}
        activeInnerRadiusOffset={13}
        activeOuterRadiusOffset={16}
        borderWidth={3}
        borderColor={{
          from: 'color',
          modifiers: [['darker', '0.8']],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextOffset={12}
        arcLinkLabelsTextColor="#ffff00"
        arcLinkLabelsDiagonalLength={fontSize * 1}
        arcLinkLabelsStraightLength={fontSize * 1.2}
        arcLinkLabelsThickness={5}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'python',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'scala',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'lisp',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'elixir',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'javascript',
            },
            id: 'lines',
          },
        ]}
        motionConfig="wobbly"
        transitionMode="pushOut"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 63,
            itemsSpacing: fontSize * 1.5,
            itemWidth: 97,
            itemHeight: 36,
            itemTextColor: '#ffff00',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 27,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChartRenderer;

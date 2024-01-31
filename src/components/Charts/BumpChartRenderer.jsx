import { ResponsiveBump } from '@nivo/bump';
import { useWindowSize } from '../../hooks/windowSize';
import { useEffect, useState } from 'react';

const BumpChartRenderer = ({ data /* see data tab */ }) => {
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
      <ResponsiveBump
        data={data}
        colors={{ scheme: 'spectral' }}
        theme={{
          text: {
            fontSize: fontSize,
            fill: '#ffff00',
            outlineWidth: 1,
            outlineColor: 'transparent',
          },
        }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'ranking',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
      />
    </div>
  );
};
export default BumpChartRenderer;

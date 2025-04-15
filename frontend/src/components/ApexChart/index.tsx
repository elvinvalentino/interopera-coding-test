import React, { useEffect, useState } from 'react';
import { Props as ReactApexChartProps } from 'react-apexcharts';

interface IProps extends ReactApexChartProps {}

const ApexChart: React.FC<IProps> = props => {
  const [Chart, setChart] = useState<any>();
  const hasType = typeof props?.type !== 'undefined';

  useEffect(() => {
    import('react-apexcharts').then(mod => {
      setChart(() => mod.default);
    });
  }, []);

  return hasType && Chart && <Chart {...props} />;
};

export default ApexChart;

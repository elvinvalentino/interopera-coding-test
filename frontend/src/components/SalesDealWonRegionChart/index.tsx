'use client';

import React from 'react';
import ApexChart from '../ApexChart';
import ReactApexChart from 'react-apexcharts';
import { Sale } from '../../hooks/queries/sales/sales';

interface IProps {
  sales: Sale[];
}

const SalesDealWonRegionChart: React.FC<IProps> = ({ sales }) => {
  const data = sales.reduce((res, sale) => {
    const region = sale.region;
    if (!res[region]) {
      res[region] = 0;
    }
    res[region] += sale.deals
      .filter(deal => deal.status === 'Closed Won')
      .reduce((a, b) => a + b.value, 0);
    return res;
  }, {} as Record<string, number>);

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: Object.keys(data),
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
  };

  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: 'Sales Deal Won',
      data: Object.values(data),
    },
  ];

  return (
    <ApexChart options={options} series={series} type="bar" height={325} />
  );
};

export default SalesDealWonRegionChart;

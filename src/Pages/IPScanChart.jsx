import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IPScanChart = ({ ports }) => {
  const openPorts = ports.filter(p => p.state === 'Open').length;
  const closedPorts = ports.length - openPorts;

  const data = {
    labels: ['Open Ports', 'Closed Ports'],
    datasets: [
      {
        data: [openPorts, closedPorts],
        backgroundColor: ['#2a9d8f', '#e63946'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '300px', marginTop: '20px' }}>
      <h5>Port Distribution</h5>
      <Pie data={data} />
    </div>
  );
};

export default IPScanChart;

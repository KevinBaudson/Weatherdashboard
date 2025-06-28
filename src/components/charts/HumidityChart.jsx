import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function HumidityChart({ forecast }) {
  const labels = forecast.map(item => item.dt_txt.split(' ')[1].slice(0, 5));
  const data = {
    labels,
    datasets: [{
      label: 'Umidade (%)',
      data: forecast.map(item => item.main.humidity),
      borderColor: '#36a2eb',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4,
      fill: true,
    }],
  };

  return <Line data={data} />;
}

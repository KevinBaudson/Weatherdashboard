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

export default function WindChart({ forecast }) {
  const labels = forecast.map(item => item.dt_txt.split(' ')[1].slice(0, 5));
  const data = {
    labels,
    datasets: [{
      label: 'Vento (m/s)',
      data: forecast.map(item => item.wind.speed),
      borderColor: '#00C49F',
      backgroundColor: 'rgba(0, 196, 159, 0.2)',
      tension: 0.4,
      fill: true,
    }],
  };

  return <Line data={data} />;
}

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

export default function TemperatureChart({ forecast }) {
  const labels = forecast.map(item => item.dt_txt.split(' ')[1].slice(0, 5));
  const data = {
    labels,
    datasets: [{
      label: 'Temperatura (°C)',
      data: forecast.map(item => item.main.temp),
      borderColor: '#FF6384',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
      fill: true,
    }],
  };

  return <Line data={data} />;
}

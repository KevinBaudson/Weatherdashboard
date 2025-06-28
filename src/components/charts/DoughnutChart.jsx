import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutChart({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return <p>Carregando dados...</p>;
  }

  const avgHumidity =
    forecast.reduce((acc, cur) => acc + cur.main.humidity, 0) / forecast.length;
  const avgWind =
    forecast.reduce((acc, cur) => acc + cur.wind.speed, 0) / forecast.length;
  const avgTemp =
    forecast.reduce((acc, cur) => acc + cur.main.temp, 0) / forecast.length;

  const data = {
    labels: ["Umidade (%)", "Vento (m/s)", "Temperatura (°C)"],
    datasets: [
      {
        label: "Média",
        data: [avgHumidity.toFixed(1), avgWind.toFixed(1), avgTemp.toFixed(1)],
        backgroundColor: ["#2864b9", "rgba(169, 113, 255, 0.2)", "#1f2630"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    animation: {
      duration: 1200,
      easing: "easeInOutQuart",
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          color: "var(--text-primary)",
          font: {
            size: 14,
          },
          // boxWidth: 20,
           usePointStyle: true,
          // padding: 15,
        },

      },
      title: {
        display: true,
        text: "Médias de Umidade, Vento e Temperatura",
        color: "var(--text-primary)",
        font: {
          size: 15,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.75)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div style={{ height: "250px", width: "100%", position: "relative" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

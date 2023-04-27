import React, { useEffect } from "react";
import classes from "../styles/pageview.module.css";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function PageView() {
  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        border: { dash: [4, 4] },
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      await getFacts();
    }
    fetchData();
  }, []);

  // Fetcher function
  const getFacts = async () => {
    const res = await fetch("https://fe-task-api.mainstack.io/");
    return res.json();
  };

  const { data, error, isLoading } = useQuery("randomFacts", getFacts);

  // Error and Loading states
  if (error) return <div>Request Failed</div>;
  

  const dataOne = {
    labels: Object.keys(data?.graph_data.views),
    datasets: [
      {
        data: Object.keys(data.graph_data.views).map(
          (date) => `${data.graph_data.views[date]}`
        ),
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, " rgba(250,174,50,0)");
          gradient.addColorStop(1, "rgba(250,174,50,1)");
          return gradient;
        },
      },
    ],
  };
  // if (isLoading) {
  //   <div>Loading..</div>;
  // }

  return (
    <section className={classes.pageview}>
      <h1>Page View</h1>
      <p>All Time</p>
      <h2>500</h2>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div id="canvas-container">
          <Line options={options} data={dataOne} style={{ height: 300 }} />
        </div>
      )}
    </section>
  );
}

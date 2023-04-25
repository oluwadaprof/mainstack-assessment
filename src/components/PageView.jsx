import React, { useEffect } from "react";
import classes from "../styles/pageview.module.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";

export default function PageView() {
  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
    scales: {
      y: {
        gridLines: {
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
  if (isLoading) return <div>Loading...</div>;

  // Using the hook

  const viewsArray = Object.keys(data.graph_data.views).map(
    (date) => `${date} `
  );
  console.log(viewsArray);

  const labels = viewsArray;

  const dataOne = {
    labels: labels,
    datasets: [
      {
        // label: "My First dataset",
        // backgroundColor: "rgb(255, 99, 132)",
        // borderColor: "rgb(255, 99, 132)",
        data: Object.keys(data.graph_data.views).map(
          (date) => `${data.graph_data.views[date]}`
        ),
        fill: {
          target: 'origin',
          above: 'rgb(255, 0, 0)',   // Area will be red above the origin
          below: 'rgb(0, 0, 255)'    // And blue below the origin
        }
      },
      
    ],
  };

  console.log(data);

  return (
    <section className={classes.pageview}>
      <h1>Page View</h1>
      <p>All Time</p>
      <h2>500</h2>
      <div id="canvas-container">
        <Line options={options} data={dataOne} style={{ height: 300 }} />
      </div>
    </section>
  );
}

// className={classes.chart_container}
//   const graphData = {
//     views: {
//       "2022-07-31": 1,
//       "2022-08-01": 3,
//       "2022-08-02": 3,
//       "2022-08-03": 7,
//       "2022-08-04": 8,
//       "2022-08-05": 5,
//       "2022-08-06": 20,
//       "2022-08-07": 50,
//       "2022-08-08": 100,
//       "2022-08-09": 2,
//     },
//   };

//   const labels = Object.keys(graphData.views); // Extract labels array
//   const data = Object.values(graphData.views); // Extract data array

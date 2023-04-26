import React, { useEffect } from "react";
import classes from "../styles/doughnoutchart.module.css";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";

export default function DoghnoutChart() {
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

  const topLocation = data.top_locations;

  console.log(topLocation);

  const dataFetched = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],

        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Make the doughnut chart a circle
    layout: {
      width: 20,
      padding: {
        left: 20, // Add left padding to make space for labels
        right: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          display: true,
          position: "left",
          left: "-10rem",
          color: "#666", // Set the label color to gray
          font: {
            size: 12,
          },
          formatter: (value, context) => {
            return context.chart.dataFetched.labels[context.dataIndex];
          }, // Hide the legend
        },
      },
    },
  };

  return (
    <div className={classes.doughnut}>
      <header>
        <p>Top Location</p>
        <span>View full reports</span>
      </header>
      <div id="canvas-container" className={classes.label}>
        {topLocation.map(({ country, percent, count }) => (
          <ul key={percent} >
            <li>
              {country} <span className={classes.percent}>{percent}</span>{" "}
              <div className={classes.circle}></div>
            </li>
            {/* <li>Nigeria <span className={classes.percent}>20%</span><div className={classes.circle}></div></li>
            <li>Nigeria <span className={classes.percent}>20%</span><div className={classes.circle}></div></li>
            <li>Nigeria <span className={classes.percent}>20%</span><div className={classes.circle}></div></li>
            <li>Nigeria <span className={classes.percent}>20%</span><div className={classes.circle}></div></li>
            <li>Nigeria <span className={classes.percent}>20%</span><div className={classes.circle}></div></li> */}
          </ul>
        ))}
        <Doughnut
          data={dataFetched}
          options={options}
          style={{
            width: "200px",
            height: "200px",
            marginLeft: "10rem",
            flexDirection: "row",
          }}
        />
      </div>
    </div>
  );
}

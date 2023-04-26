import React, { useEffect } from "react";
import classes from "../styles/pageview.module.css";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";

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

  const { data } = useQuery("randomFacts", getFacts);
  console.log(data)

  // Error and Loading states


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
          target: "origin",
          above: "rgb(0, 0, 255)", // Area will be red above the origin
          below: " rgb(255, 0, 0)", // And blue below the origin
        },
      },
    ],
  };
  // if (isLoading) {
  //       <div>Loading..</div>;
  //    }  

  return (
    <section className={classes.pageview}>
      <h1>Page View</h1>
      <p>All Time</p>
      <h2>500</h2>
      {/* {loadingErrorState} */}
      <div id="canvas-container">
        <Line options={options} data={dataOne} style={{ height: 300 }} />
      </div>
    </section>
  );
}

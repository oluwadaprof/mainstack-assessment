import React, { useEffect } from "react";
import classes from "../styles/doughnoutchart.module.css";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";
import { NG } from "country-flag-icons/react/3x2";
import { FI } from "country-flag-icons/react/3x2";
import { GH } from "country-flag-icons/react/3x2";
import { GR } from "country-flag-icons/react/3x2";
import { GB } from "country-flag-icons/react/3x2";

export default function DoghnoutChart() {
  const flags = [
    <NG title="Nigeria" className={classes.flag} />,
    <GR title="Germany" className={classes.flag} />,
    <GH title="Ghana" className={classes.flag} />,
    <FI title="Finland" className={classes.flag} />,
    <GB title="United Kingdom" className={classes.flag} />,
  ];
  const colors = ["#599EEA", "#844FF6", "#0FB77A", "#FAB70A", "#F09468"];
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



  const dataFetched = {
    labels: topLocation.map(({ country }) => country),
    datasets: [
      {
        label: 'my',
        data: topLocation.map((location)=>location.percent),

        backgroundColor: [
          "#599EEA",
          "#844FF6",
          "#0FB77A",
          "#FAB70A",
          "#F09468",
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
      {topLocation.map(({ country, percent, count }, index) => (
        <ul key={index}>
          <li>
            {flags[index]}{" "}
            {/* Render the flag component at the corresponding index */}
            {country} <div className={classes.percent}>{percent}%</div>{" "}
            <div
              style={{ backgroundColor: colors[index % colors.length] }}
              className={classes.circle}
            ></div>
          </li>
        </ul>
      ))}
      <Doughnut
        data={dataFetched}
        options={options}
        style={{
          width: "230px",
          height: "200px",
          position: "absolute",
          marginLeft: "20rem",
          marginTop: "-45rem",
          flexDirection: "row",
        }}
      />
      {/* </div> */}
    </div>
  );
}

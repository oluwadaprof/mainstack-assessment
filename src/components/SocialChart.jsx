import React, { useEffect } from "react";
import classes from "../styles/doughnoutchart.module.css";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";
import { SocialIcon } from "react-social-icons";

export default function SocialChart() {
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

  const topSources = data.top_sources;

  console.log(topSources);

  const dataFetched = {
    labels:  topSources.map(({ source }) => source),
    datasets: [
      {
        label: "",
        data: topSources.map((location)=>location.percent),

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

        },
      },
    },
  };
  const socialIcons = [
    <SocialIcon network="google" style={{ height: 25, width: 25 }} />,
    <SocialIcon network="instagram" style={{ height: 25, width: 25 }} />,
    <SocialIcon network="facebook" style={{ height: 25, width: 25 }} />,
    <SocialIcon network="linkedin" style={{ height: 25, width: 25 }} />,
  ];
  const colors = ["#599EEA", "#844FF6", "#0FB77A", "#FAB70A", "#F09468"];

  return (
    <div className={classes.doughnut}>
      <header>
        <p>Top Referal Source</p>
        <span>View full reports</span>
      </header>
      {topSources.map(({ source, percent, count }, index) => (
        <ul key={index}>
          <li>
            {socialIcons[index]}{" "}
            {/* Render the flag component at the corresponding index */}
            {source} <span className={classes.percent}>{percent}%</span>{" "}
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
          marginTop: "-33rem",
          flexDirection: "row",
        }}
      />

    
    </div>
  );
}

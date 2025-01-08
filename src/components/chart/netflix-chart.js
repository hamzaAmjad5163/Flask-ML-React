import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Netflix = () => {
  const [netflixChartData, setNetflixChartData] = useState(null);
  const [imdbChartData, setImdbChartData] = useState(null);

  useEffect(() => {
    // Fetch Netflix data
    fetch("http://127.0.0.1:2010/netflix")
      .then((response) => response.json())
      .then((data) => {
        const netflixOptions = {
          chart: {
            type: "bar",
            
          },
          title: {
            text: null,
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            categories: data.categories,
            title: {
              text: "Type",
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: "Number of Titles",
            },
          },
          plotOptions: {
            bar: {
              shadow: {
                color: "rgba(0, 0, 0, 0.25)",
                offsetX: 5,
                offsetY: 5,
                width: 10,
              },
            },
          },
          series: [
            {
              name: "Titles",
              data: data.counts,
              color: "#4060B7",
              shadow: {
                color: "rgba(0, 0, 0, 0.25)",
                offsetX: 2,
                offsetY: 2,
                width: 4,
              },
            },
          ],
        };
        setNetflixChartData(netflixOptions);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });

    // Fetch IMDB data
    fetch("http://127.0.0.1:2005/imdb")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const chartOptions = {
          chart: {
            type: "bar",
            
          },
          title: { text: "IMDB Top 1000 Movies by Genre" },
          credits: { enabled: false },
          xAxis: { categories: data.categories, title: { text: "Genre" } },
          yAxis: { min: 0, title: { text: "Number of Titles" } },
          plotOptions: {
            bar: {
              shadow: {
                color: "rgba(0, 0, 0, 0.25)",
                offsetX: 5,
                offsetY: 5,
                width: 10,
              },
            },
          },
          series: [
            {
              name: "Titles",
              data: data.counts,
              color: "#FF6347",
              shadow: {
                color: "rgba(0, 0, 0, 0.25)",
                offsetX: 2,
                offsetY: 2,
                width: 4,
              },
            },
          ],
        };
        setImdbChartData(chartOptions); // Corrected here
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="px-4">
      <h2 className="text-center my-5">Netflix & IMDB Survey</h2>
      <div className="d-flex justify-content-between">
        <div className="chart-container" style={{ width: "48%" }}>
          <h4>Netflix Survey</h4>
          {netflixChartData ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={netflixChartData}
            />
          ) : (
            <p>Loading Netflix chart...</p>
          )}
        </div>
        <div className="chart-container" style={{ width: "48%" }}>
          <h4>IMDB Survey</h4>
          {imdbChartData ? (
            <HighchartsReact highcharts={Highcharts} options={imdbChartData} />
          ) : (
            <p>Loading IMDB chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Netflix;

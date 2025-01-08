import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HighchartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:2020/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const chartOptions = {
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
              text: "Programming Languages",
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: "Number of Respondents",
            },
          },
          series: [
            {
              name: "Respondents",
              data: data.counts,
              color: "#4060B7", // Apply color to the bars
            },
          ],
        };
        setChartData(chartOptions);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center my-5">Stack Overflow Survey 2016 - Programming Languages</h2>
      {chartData ? (
        <HighchartsReact highcharts={Highcharts} options={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};
export default HighchartComponent;

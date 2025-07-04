import React from "react";
import ReactApexChart from "react-apexcharts";
import { motion } from "framer-motion";

const Charts = () => {
  const commonOptions = {
    chart: {
      height: 250,
      width: "100%",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    colors: ["#4ade80", "#60a5fa", "#fbbf24", "#db2777", "#3b82f6"],
    fill: {
      opacity: 0.9,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const chartsData = [
    {
      title: "Vertical Bar Chart",
      type: "bar",
      series: [
        {
          name: "Sales",
          data: [44, 55, 41, 67, 22, 43, 21, 49, 52, 51, 37, 42],
        },
      ],
      options: {
        ...commonOptions,
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          style: {
            fontFamily: "Poppins",
          },
        },
      },
    },
    {
      title: "Pie Chart",
      type: "pie",
      series: [44, 55, 13, 43, 22],
      options: {
        ...commonOptions,
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      },
    },
    {
      title: "Radar Chart",
      type: "radar",
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20],
        },
      ],
      options: {
        ...commonOptions,
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June"],
        },
      },
    },
    {
      title: "Doughnut Chart",
      type: "donut",
      series: [44, 55, 13, 43, 22],
      options: {
        ...commonOptions,
        labels: ["Apple", "Mango", "Orange", "Watermelon", "Strawberry"],
      },
    },
    {
      title: "Polar Area Chart",
      type: "polarArea",
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      options: {
        ...commonOptions,
        labels: [
          "Apple",
          "Mango",
          "Orange",
          "Watermelon",
          "Strawberry",
          "Banana",
          "Grapes",
          "Peach",
          "Blueberry",
        ],
      },
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {chartsData.map((chart, index) =>
        index === 0 ? (
          <motion.div
            key={index}
            className="bg-[#1e293b] rounded-lg p-4 col-span-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-blue-200 mb-4"
            >
              {chart.title}
            </motion.h3>
            <ReactApexChart
              options={chart.options}
              series={chart.series}
              type={chart.type}
              height={250}
            />
          </motion.div>
        ) : (
          <motion.div
            key={index}
            className="bg-[#1e293b] rounded-lg p-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-blue-200 mb-4"
            >
              {chart.title}
            </motion.h3>
            <ReactApexChart
              options={chart.options}
              series={chart.series}
              type={chart.type}
              height={200}
            />
          </motion.div>
        )
      )}
    </div>
  );
};

export default Charts;

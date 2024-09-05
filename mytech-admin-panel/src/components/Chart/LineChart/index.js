"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { sampleData } from "@/utils/constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const sizeChart = {
  sm: { width: "100%", height: 550 },
  md: { width: "100%", height: 197 },
  lg: { width: "100%", height: 450 },
};

const LineChart = ({ data }) => {
  const labelFunction = useMemo(() => {
    return (tooltipItem) => {
      const datasetLabel = tooltipItem.dataset.label || "";
      const value = tooltipItem.raw;
      return `${datasetLabel}: $${value}`;
    };
  }, []); 
  const [chartSize, setChartSize] = useState(sizeChart.lg);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartSize(sizeChart.sm);
      } else if (width < 1024) {
        setChartSize(sizeChart.md);
      } else {
        setChartSize(sizeChart.lg);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 

  const crosshairPlugin = {
    id: "crosshairLine",
    afterDraw: (chart) => {
      if (chart.tooltip?._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        ctx.save();
        const activePoint = chart.tooltip._active[0];
        const x = activePoint.element.x;
        const y = activePoint.element.y;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;
        const leftX = chart.scales.x.left;
        const rightX = chart.scales.x.right;
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
      }
    },
  };

  ChartJS.register(crosshairPlugin);

  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 20,
          boxHeight: 15,
          padding: 20,
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Revenue and Sales",
        align: "start",
        color: "#4F4F4F",
        font: {
          size: 14,
          weight: "bold",
        },
        padding: {
          bottom: 5,
          left:5,
          top:5
          
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: labelFunction,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
          color: "#E0E0E0",
          borderDash: [1, 1],
          borderWidth: 1,
        },
        ticks: {
          color: "#4F4F4F",
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: true,
          color: "#E0E0E0",
          borderDash: [5, 5],
          borderWidth: 2,
        },
        ticks: {
          color: "#4F4F4F",
          font: {
            size: 12,
          },
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  const combinedOptions = { ...defaultOptions };

  return (
    <div
      style={{
        width: chartSize.width,
        height: chartSize.height,
        position: "relative",
      }}
    >
      <Line
        data={data || sampleData}
        options={combinedOptions}
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
};

export default LineChart;

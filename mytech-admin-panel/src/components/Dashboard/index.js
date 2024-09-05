import React from "react";
import LineChart from "../Chart/LineChart";
import { lineChartData } from "@/utils/constant";

const DashboardComponent = () => {
  return (
    <>
      <h2 className="text-2xl font-bold">Welcome Back Jenil</h2>
      <p className="my-4">Your main content goes here.</p>
      <LineChart data={lineChartData} />
    </>
  );
};

export default DashboardComponent;

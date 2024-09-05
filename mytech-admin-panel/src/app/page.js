"use client"
import React, { Suspense } from "react";
import DashboardComponent from "../components/Dashboard";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardComponent />
    </Suspense>
  );
}



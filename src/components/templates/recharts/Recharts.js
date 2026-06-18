"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  {
    date: "شنبه",
    appointment: 2,
  },
  {
    date: "یک شنبه",
    appointment: 2,
  },
  {
    date: "دو شنبه",
    appointment: 2,
  },
  {
    date: "سه شنبه",
    appointment: 2,
  },
  {
    date: "چهار شنبه",
    appointment: 2,
  },
  {
    date: "پنج شنبه",
    appointment: 2,
  },
  {
    date: "جمعه",
    appointment: 2,
  },
];

const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 25,
};

export default function Recharts() {
  return (
    <BarChart width={"80%"} height={300} data={data} margin={margin}>
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis dataKey="date" />
      <YAxis />
      <Bar dataKey="appointment" fill="#8884d8" />
    </BarChart>
  );
}

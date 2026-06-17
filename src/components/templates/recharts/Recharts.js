import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
    <BarChart width={600} height={300} data={data} margin={margin}>
      <XAxis
        dataKey="name"
        tickFormatter={formatAxisTick}
        label={{
          position: "insideBottomRight",
          value: "XAxis title",
          offset: -10,
        }}
      />
      <YAxis
        label={{
          position: "insideTopLeft",
          value: "YAxis title",
          angle: -90,
          dy: 60,
        }}
      />
      <Bar dataKey="uv" fill="#8884d8" label={renderCustomBarLabel} />
      <RechartsDevtools />
    </BarChart>
  );
}

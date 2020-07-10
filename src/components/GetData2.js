import React, { useEffect, useState } from "react";
import {
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const socket = new WebSocket("wss://ws.finnhub.io?token=bs48ucfrh5rfsv3e7md0");

socket.addEventListener("open", function (event) {
  socket.send(JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }));
});

//function to generate label for each element in the graph
const labelFunction = (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

function GetData2() {
  //styling to center the chart
  let styleObj = {
    width: "100%",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [apidata, changeApiData] = useState([0]);
  let temp = null;

  useEffect(() => {
    // Listen for messages
    socket.addEventListener("message", function (event) {
      if (JSON.parse(event.data).data) {
        //updating state only there is change in the data
        if (temp !== JSON.parse(event.data).data[0].p) {
          temp = JSON.parse(event.data).data[0].p;
          changeApiData((old) => [
            ...old,
            { time: new Date().toLocaleTimeString(), price: temp },
          ]);
        }
      }
    });
  }, [socket]);

  //limiting the no.of elements in the graph
  useEffect(() => {
    if (apidata.length > 30) {
      apidata.shift();
    }
  }, [apidata]);

  return (
    <div style={styleObj}>
      <AreaChart
        width={1200}
        height={500}
        data={apidata}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="time" /> */}
        <YAxis domain={[9210, 9220]} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#82ca9d"
          label={labelFunction}
          //   isAnimationActive={false}
        />
      </AreaChart>
    </div>
  );
}

export default GetData2;

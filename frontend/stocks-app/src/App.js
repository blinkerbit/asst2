import React, { useEffect, useState } from "react";
import "./App.css";

import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Dropdown } from "./Dropdown";
Chart.register(...registerables);

const data_test = {
  stockHistory: [
    [
      "03-01-2022",
      "04-01-2022",
      "05-01-2022",
      "06-01-2022",
      "07-01-2022",
      "10-01-2022",
      "11-01-2022",
      "12-01-2022",
      "13-01-2022",
      "14-01-2022",
      "17-01-2022",
      "18-01-2022",
      "19-01-2022",
      "20-01-2022",
      "21-01-2022",
      "24-01-2022",
      "25-01-2022",
      "27-01-2022",
      "28-01-2022",
      "31-01-2022"
    ],
    [
      621.4,
      615.3,
      609.0,
      607.0,
      609.7,
      592.85,
      593.3,
      591.0,
      585.45,
      611.9,
      619.95,
      615.75,
      629.65,
      655.15,
      643.0,
      627.65,
      601.0,
      618.5,
      597.0,
      615.0
    ],
    [
      612.2,
      606.95,
      608.85,
      602.35,
      592.85,
      593.3,
      583.95,
      585.0,
      604.2,
      615.75,
      615.75,
      628.25,
      652.95,
      641.3,
      624.55,
      608.5,
      626.85,
      596.45,
      598.3,
      592.95
    ],
    [
      623.1,
      620.3,
      618.95,
      614.0,
      609.7,
      603.05,
      600.1,
      591.0,
      617.1,
      625.0,
      620.9,
      644.55,
      666.0,
      668.15,
      644.0,
      633.7,
      635.05,
      631.55,
      616.8,
      615.0
    ],
    [
      610.0,
      602.1,
      604.85,
      597.0,
      589.95,
      591.95,
      581.5,
      581.55,
      585.45,
      596.5,
      612.05,
      614.1,
      628.25,
      639.25,
      611.9,
      601.1,
      601.0,
      592.0,
      597.0,
      592.0
    ],
    [
      25811,
      24158,
      15738,
      23138,
      31064,
      23349,
      38694,
      23067,
      38540,
      37580,
      21605,
      105029,
      120621,
      40327,
      26184,
      48215,
      28235,
      53287,
      27453,
      23352
    ]
  ]
};





const testDropdown = {"SYMBOL": "NAME OF COMPANY", "20MICRONS": "20 Microns Limited", "21STCENMGM": "21st Century Management Services Limited", "3IINFOLTD": "3i Infotech Limited", "3MINDIA": "3M India Limited", "3PLAND": "3P Land Holdings Limited", "5PAISA": "5Paisa Capital Limited"}


export default function App() {
 const [startDate, setStartdate] = useState();
 const [endDate, setEndDate] = useState();
 const [codes, setCodes] = useState();
 const [selectedCode,setSelctedCode] = useState('21STCENMGM');
 const [stockHistory,setStockHistory] = useState();
 const [chartData,setchartData] = useState();
 const [chart2Data,setchart2Data] = useState();


  useEffect(()=>{
    getCodes();
  },[])

  useEffect(()=>{
   getStockHistory();
  }, [selectedCode]);

  const getCodes = () => {
    console.log('hitting code api')
;    fetch('http://localhost:8098/codes', {
      method: 'GET',
      })
      .then(response =>response.json()).then(response=>{
        console.log('response is',response);
         setCodes(response);
      })
  }

  const getStockHistory = () => {
    fetch(`http://localhost:8098/history/${selectedCode}?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      })
      .then(response =>response.json()).then(response=>{
        setStockHistory(response)

       })
  }

  const getRangeData = () => {
    // add range fetch apin same as above
    // url : http://localhost:8098/history/<stock-key>?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd 
  }

  const onSubmit =()=>{
    getStockHistory()
    console.log("after stock hist")

    console.log( stockHistory)

    getChartData(stockHistory)
  }

  const getChartData =(data_test) => {
  const data = {
    labels: data_test.stockHistory[0],
    datasets: [
      {
        label: "Open",
        data: data_test.stockHistory[1],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Close",
        data: data_test.stockHistory[2],
        fill: false,
        borderColor: "#CBC3E3"
      },
      {
        label: "High",
        data: data_test.stockHistory[3],
        fill: false,
        borderColor: "#742774"
      },
      {
        label: "Low",
        data: data_test.stockHistory[4],
        fill: false,
        borderColor: "#a1caf1"
      }
    ]



  };

  const data2 = {
    labels: data_test.stockHistory[0],
    datasets: [
      {
  
        label: "Volume",
        data: data_test.stockHistory[5],
        fill: false,
        borderColor: "#80daeb",
  
      }
    ]
  }

  console.log('chart data',data)
setchartData(data)
setchart2Data(data2)
}
  


  const onCodeSelected = (codeVal) => {
    setSelctedCode(codeVal);
    console.log('set code',codeVal);
  }
  return (
    <div className="App">
      <div>
        <Dropdown range={codes} onCodeSelected={onCodeSelected} />
          <input value={startDate} placeholder='start date  yyyy-mm-dd' onChange={(e)=>setStartdate(e.target.value)}/>
          <input value={endDate} placeholder='end date  yyyy-mm-dd' onChange={(e)=>setEndDate(e.target.value)}/>
          <button onClick={onSubmit}>Get Data</button>

          </div>
          { stockHistory &&  chartData && 
          <div>
    <Line data={chartData} />
      <Line data={chart2Data} /></div> }
      </div>
  );
}

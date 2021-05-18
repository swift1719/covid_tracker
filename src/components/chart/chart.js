import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line,Bar} from 'react-chartjs-2';
import styles from './chart.css';

const Chart = ({data:{confirmed,recovered,deaths},country}) => {
    const [dailyData, setdailyData] = useState([]);
    let lineChart;
    useEffect(()=>{
        const fetchAPI=async ()=>{
            setdailyData(await fetchDailyData());
        };
        fetchAPI();
    },[]);
    
    if(dailyData){
        lineChart = dailyData.length?(
            <Line
            data={{
                labels:dailyData.map(({date})=>date),
                datasets:[
                    {
                        data:dailyData.map(({confirmed})=>confirmed),
                        label:"Infected",
                        borderColor:"#3333ff",
                        fill:true
                    },
                    {
                        data:dailyData.map(({deaths})=>deaths),
                        label:"Deaths",
                        borderColor:"red",
                        backgroundColor:"rgba(255,0,0,0.5)",
                        fill:true,
                    },
                ],
            }}
            />
        ):null;
    }
    

    const barChart = confirmed?(
        <Bar
        data={{
            labels:["Infected","Recovered","Deaths","Active"],
            datasets:[
                {
                    label:"People",
                    backgroundColor:[
                        "rgba(0,0,255,0.5)",
                        "rgba(0,255,0,0.5)",
                        "rgba(255,0,0,0.5)",
                        "rgba(242,234,0,0.5)",
                    ],
                    hoverBackgroundColor:[
                        "rgb(0,77,153)",
                        "rgb(30,102,49)",
                        "rgb(255,51,51)",
                        "rgb(204,153,0)",
                    ],
                    data:[
                        confirmed.value,
                        recovered.value,
                        deaths.value,
                        confirmed.value-(recovered.value+deaths.value),
                    ],
                },
            ],
        }}
        options={{
            legend:{display:false},
            title:{display:true,text:`Current state in ${country.toUpperCase()}`}
        }}
        />
    ):null;

    return (
        <div className={styles.container}>
            {country?barChart:lineChart}
        </div>
    )
}
export default Chart;
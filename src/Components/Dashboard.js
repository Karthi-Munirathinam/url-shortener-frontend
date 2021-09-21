import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './dashboard.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UrlCard from './Card';
import axios from './Connection';
import { useHistory } from 'react-router-dom';

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Total links created',
            data: [12, 19, 3, 5, 0, 0, 0, 0, 1],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        display: false
    },
    scales: {
        xAxes: {
            grid: {
                display: false
            }
        },
        yAxes:
        {
            title: {
                display: true,
                text: 'Total links created'
            },
            ticks: {
                beginAtZero: true,
            },
        },
    },
};

function Dashboard() {
    const [urldata, seturldata] = useState([]);
    const [daydata, setDaydata] = useState([]);
    const [alignment, setAlignment] = useState('Day');
    const history = useHistory();

    useEffect(() => {
        const getUrl = async () => {
            let token = window.localStorage.getItem("app-token");
            if (!token) {
                history.push('/login')
            }
            let data = await axios.get('/geturl', {
                headers: {
                    "authorization": token,
                    "Content-type": "application/json"
                }
            });
            seturldata(data.data)
        }
        const daysData = async () => {
            let token = window.localStorage.getItem("app-token");
            if (!token) {
                history.push('/login')
            }
            let data = await axios.get('/chartdata', {
                headers: {
                    "authorization": token,
                    "Content-type": "application/json"
                }
            });
            setDaydata(data.data);
        }
        getUrl();
    }, [history])
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div className="container p-4 dashboard-container">
            <div className="row">
                <div className="col-md-8 chart-container">
                    <div className="row p-3 align-right">
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                        >
                            <ToggleButton value="Day">Day</ToggleButton>
                            <ToggleButton value="Month">Month</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="row">
                        <Bar data={data} options={options} className="col-12" style={{ minWidth: "50vw" }} />
                    </div>
                </div>
                <div className="col-md-4 urls-container">
                    {
                        urldata.map(urls => {
                            return <UrlCard key={urls.UrlID} urls={urls} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard

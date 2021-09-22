import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './dashboard.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UrlCard from './Card';
import axios from './Connection';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';

function Dashboard() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [isLoading, setIsLoading] = useState(false);
    const [urldata, seturldata] = useState([]);
    const [dayData, setDayData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [alignment, setAlignment] = useState('');
    const [label, setLabel] = useState([]);
    const [chartdata, setChartData] = useState([])
    const [data, setData] = useState({});
    useEffect(() => {
        const getUrl = async () => {
            try {
                let token = window.localStorage.getItem("app-token");
                if (!token) {
                    history.push('/login')
                }
                setIsLoading(true);
                let data = await axios.get('/geturl', {
                    headers: {
                        "authorization": token,
                        "Content-type": "application/json"
                    }
                });
                setIsLoading(false);
                seturldata(data.data)
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }

        }
        const Totaldata = async () => {
            try {
                let token = window.localStorage.getItem("app-token");
                if (!token) {
                    history.push('/login')
                }
                setIsLoading(true);
                let data = await axios.get('/chartdata', {
                    headers: {
                        "authorization": token,
                        "Content-type": "application/json"
                    }
                });
                setDayData(data.data.urlsperday);
                setMonthData(data.data.urlspermonth);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        getUrl();
        Totaldata();
        initialdatavalues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setData({
            labels: label,
            datasets: [
                {
                    label: 'Total links created',
                    data: chartdata,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        })
    }, [chartdata, label])

    const history = useHistory();
    const initialdatavalues = () => {
        const daylabel = dayData.map(obj => {
            return `${obj._id.day} ${month[obj._id.month - 1]}`
        })
        setLabel(daylabel);
        const daychartdata = dayData.map(obj => {
            return obj.count
        })
        setChartData(daychartdata);
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        if (newAlignment === "Day") {
            initialdatavalues();
        } else if (newAlignment === "Month") {
            const monthlabel = monthData.map(obj => {
                return `${month[obj._id.month - 1]} ${obj._id.year}`
            })
            setLabel(monthlabel);
            const monthchartdata = monthData.map(obj => {
                return obj.count
            })
            setChartData(monthchartdata);
        }
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
                },
                ticks: {
                    maxTicksLimit: 12
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
                    stepSize: 1
                },
            },
        },
    };

    return (
        <div className="container p-4 dashboard-container">
            {
                isLoading ? <Loading /> : (
                    <div className="row">
                        <div className="col-md-8 chart-container">
                            <div className="row text-muted">Choose Day / Month</div>
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
                )
            }

        </div>
    )
}

export default Dashboard

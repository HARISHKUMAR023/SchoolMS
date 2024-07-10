import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const AreaChart = () => {
    const [metrics, setMetrics] = useState({
        cpuLoad: [],
        timestamps: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000');
                const { cpuLoad, timestamps } = response.data; // Adjust this based on your API response structure
                setMetrics({ cpuLoad, timestamps });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const series = [{
        name: 'CPU Load',
        data: metrics.cpuLoad
    }];

    const options = {
        chart: {
            type: 'area',
            height: 350,
            stacked: false,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'CPU Load Over Time',
            align: 'left'
        },
        yaxis: {
            title: {
                text: 'Load (%)'
            },
            labels: {
                formatter: function (val) {
                    return val.toFixed(2); // Format the y-axis labels as needed
                }
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            }
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return val.toFixed(2); // Format the tooltip values as needed
                }
            }
        }
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default AreaChart;

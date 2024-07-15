import { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { io, Socket } from 'socket.io-client';
import { ApexOptions } from 'apexcharts';
interface ServerMetricsData {
    cpuLoad: number;
    usedMemory: number;
    time: string;
}

interface MetricsState {
    cpuLoad: number[];
    usedMemory: number[];
    timestamps: string[];
}

const ServerMetrics: React.FC = () => {
    const [metrics, setMetrics] = useState<MetricsState>({
        cpuLoad: [],
        usedMemory: [],
        timestamps: []
    });

    useEffect(() => {
        const socket: Socket = io('http://localhost:5000'); // Ensure this URL matches your server

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('serverMetrics', (data: ServerMetricsData) => {
            console.log('Received data:', data); // Debugging point
            setMetrics((prevMetrics) => ({
                cpuLoad: [...prevMetrics.cpuLoad, data.cpuLoad].slice(-20),
                usedMemory: [...prevMetrics.usedMemory, data.usedMemory].slice(-20),
                timestamps: [...prevMetrics.timestamps, data.time].slice(-20)
            }));
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const chartOptions:ApexOptions =  {
        chart: {
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            }
        },
        colors: ['#FF0000', '#0000FF'],
        xaxis: {
            categories: metrics.timestamps,
            type: 'datetime',
            labels: {
                format: 'HH:mm:ss'
            }
        },
        yaxis: [{
            title: {
                text: 'CPU Load (%)'
            },
            min: 0,
            max: 100
        }, {
            opposite: true,
            title: {
                text: 'Used Memory (bytes)'
            }
        }]
    };

    const series = [
        {
            name: 'CPU Load',
            data: metrics.cpuLoad
        },
        {
            name: 'Used Memory',
            data: metrics.usedMemory
        }
    ];

    return (
        <div>
            <h2>Server Metrics</h2>
            {/* <pre>{JSON.stringify(metrics, null, 2)}</pre>  */}
            <ApexCharts options={chartOptions} series={series} type="line" height={350} />
        </div>
    );
};

export default ServerMetrics;

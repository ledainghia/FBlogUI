import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
    {
        name: "Sun",
        morning: 4000,
        afternoon: 2400,
        evening: 2400,
    },
    {
        name: "Mon",
        morning: 3000,
        afternoon: 1398,
        evening: 2210,
    },
    {
        name: "Tue",
        morning: 2000,
        afternoon: 9800,
        evening: 2290,
    },
    {
        name: "Wed",
        morning: 2780,
        afternoon: 3908,
        evening: 2000,
    },
    {
        name: "Thu",
        morning: 1890,
        afternoon: 4800,
        evening: 2181,
    },
    {
        name: "Fri",
        morning: 2390,
        afternoon: 3800,
        evening: 2500,
    },
    {
        name: "Sat",
        morning: 3490,
        afternoon: 4300,
        evening: 2100,
    },
];

const BigChartBox = () => {
    return (
        <div className="bigChartBox">
            <h1>Access Analytics</h1>
            <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="morning"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                        />
                        <Area
                            type="monotone"
                            dataKey="afternoon"
                            stackId="1"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                        />
                        <Area
                            type="monotone"
                            dataKey="evening"
                            stackId="1"
                            stroke="#ffc658"
                            fill="#ffc658"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BigChartBox;

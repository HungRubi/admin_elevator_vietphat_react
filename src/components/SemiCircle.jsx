import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import * as actions from '../store/actions'
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Access the data for the hovered segment
        return (
            <div className="custom-tooltip p-3 bg-white border border-gray-300 rounded shadow-md">
                <p className="label text-sm font-semibold">{`${data.name}: ${data.value}%`}</p>
                {/* You can add more details from your data here if needed */}
            </div>
        );
    }
    return null;
};

const SemiCircle = () => {
    // This data would typically come from an API call
    const [chartData, setChartData] = useState([]);
    const [totalPercentage, setTotalPercentage] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getOrderPayment());
    }, [dispatch])
    const {dataOrderPayment} = useSelector(state => state.app);
    useEffect(() => {
        // Simulate fetching data for paying vs non-paying customers
        // In a real application, you'd fetch this from your backend.
        const fetchData = async () => {
            const total = dataOrderPayment?.reduce((acc, item) => acc + item.value)

            setChartData(dataOrderPayment);
            setTotalPercentage(total);
        };

        fetchData();
    }, [dataOrderPayment]);

    // Ensure the chart renders correctly if data is not yet loaded or invalid
    if (chartData.length === 0 || totalPercentage === 0) {
        return (
            <div className="bg-white p-4 rounded-lg shadow w-[calc(50%-10px)]">
                <h2 className="text-lg font-bold">Paying vs non paying</h2>
                <p className="text-sm text-gray-500">Last 7 days</p>
                <div className="flex justify-center items-center h-48">
                    <p>Loading chart data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow w-[calc(50%-10px)]">
            <div>
                <h2 className="text-lg font-bold">Paying vs non paying</h2>
                <p className="text-sm text-gray-500">Last 7 days</p>
            </div>

            <div className="flex justify-center items-center h-48">
                {/* ResponsiveContainer helps with sizing */}
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%" // Center X
                            cy="70%" // Center Y at the bottom to form a semi-circle
                            startAngle={180} // Start from the left horizontal
                            endAngle={0} // End at the right horizontal
                            innerRadius={65} // Inner radius of the arc
                            outerRadius={80} // Outer radius of the arc
                            fill="#8884d8"
                            paddingAngle={0} // No gap between slices
                            dataKey="value"
                            isAnimationActive={true} // Optional: add animation
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
                {chartData.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <div className="flex items-center">
                            {/* Use backgroundColor for the circle */}
                            <div
                                className={`w-3 h-3 rounded-full mr-2`}
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SemiCircle;
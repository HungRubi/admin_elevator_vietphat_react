import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyChart() {
    const data = [
        { month: 'Jan', value: 1000 },
        { month: 'Feb', value: 1500 },
        { month: 'Mar', value: 1300 },
        { month: 'Apr', value: 1000 },
        { month: 'May', value: 1050 },
        { month: 'Jun', value: 1950 },
        { month: 'Jul', value: 1200 },
        { month: 'Aug', value: 1300 },
        { month: 'Sep', value: 1000 },
        { month: 'Oct', value: 1200 },
        { month: 'Nov', value: 1400 },
        { month: 'Dec', value: 1200 },
    ];


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const monthData = payload[0].payload;
            
            return (
                <div className="bg-white shadow-md rounded px-3 py-2 border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                        <span className="font-medium">{monthData.month}: {monthData.value}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm w-full h-113 relative">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 0, right: 20, left:0, bottom: 0 }}
                >
                    <CartesianGrid 
                        vertical={false} 
                        stroke="#e0e0e0" 
                        strokeDasharray="3 3"
                    />
                    <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12 }} 
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12 }} 
                        domain={[600, 2100]}
                        ticks={[600, 900, 1200, 1500, 1800, 2100]} 
                        tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip 
                        content={<CustomTooltip />}
                        cursor={false}
                        isAnimationActive={false}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={2} 
                        dot={{ 
                            r: 0,
                            strokeWidth: 0,
                            fill: 'transparent'
                        }}
                        activeDot={{ 
                            r: 5, 
                            fill: '#3B82F6',
                            stroke: '#fff',
                            strokeWidth: 2,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
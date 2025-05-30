import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as actions from "../store/actions"

export default function MonthlyChart() {
    const dispatch = useDispatch();
    const {dataMonthlyRevenue} = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getMonthlyRevenue());
    }, [dispatch])
    
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
        <div className="bg-white py-6 rounded-lg shadow-sm w-full h-113 relative">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={dataMonthlyRevenue}
                    margin={{ top: 0, right: 40, left:0, bottom: 0 }}
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
                        domain={[5, 50]}
                        ticks={[5, 10, 15, 20, 25, 30, 35, 40, 45]} 
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
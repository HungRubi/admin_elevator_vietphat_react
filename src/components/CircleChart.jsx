import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import * as actions from '../store/actions'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2">
                <div className="text-sm font-medium text-gray-900">
                    {data.name}: {data.value}%
                </div>
            </div>
        );
    }
    return null;
};

const CircleChart = () => {
    const dispatch = useDispatch();
    const {dataDiscountChart} = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getOrderDiscount());
    }, [dispatch])
    const COLORS = dataDiscountChart.map(item => item.color);
    function findMaxByProperty(arr, prop) {
        if (arr.length === 0) {
            return undefined; // Hoặc null, hoặc một giá trị mặc định khác
        }

        return arr.reduce((max, current) => {
            return (current[prop] > max[prop]) ? current : max;
        });
    }
    const maxValueDiscount = findMaxByProperty(dataDiscountChart, "value")
    return (
        <div className="bg-white p-4 rounded-lg shadow w-[calc(50%-10px)]">
            <div>
                <h2 className="text-lg font-bold">Top coupons</h2>
                <p className="text-sm text-gray-500">Last 7 days</p>
            </div>

            <div className="flex justify-center items-center h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataDiscountChart}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={450}
                            paddingAngle={1}
                            dataKey="value"
                        >
                            {dataDiscountChart.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index]}
                                    stroke={COLORS[index]}
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        
                        {/* Center text */}
                        <text 
                            x="50%" 
                            y="50%" 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            className="text-3xl font-bold fill-gray-900"
                        >
                            {maxValueDiscount?.value}%
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
                {dataDiscountChart?.map((item, index) => (
                    <div key={index} 
                    className="flex justify-between">
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CircleChart
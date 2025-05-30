import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import {CustomTooltip} from '../components'
import PropTypes from 'prop-types';

const ColumnChart = ({data, summary, className, column, nameChart, className2, className3}) => {
    return (
        <div className={`bg-white p-4 rounded-lg shadow ${className} w-[calc(50%-10px)]`}>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold">{nameChart || "Total orders"}</h2>
                    <p className="text-sm text-gray-500">Last 7 days</p>
                </div>
                <div className="flex items-center">
                    <span className="text-2xl font-bold">{summary?.totalOrders}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${summary?.changePercent < 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {summary?.changePercent}%
                    </span>
                </div>
            </div>
        
            <div className="h-40 w-full flex justify-center items-center">
                <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barGap={40}>
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
                            {column?.map(item => (
                                <Bar key={item.name} dataKey={item.name} fill={item.color} radius={[4, 4, 0, 0]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className={`${className2}`}>
                {column.map((item, index) => (
                    <div key={index}
                    className={`flex justify-between mt-2 ${className3}`}>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></div>
                            <span className="text-sm capitalize">{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )   
}

ColumnChart.propTypes = {
    data: PropTypes.array,
    summary: PropTypes.object,
    column: PropTypes.array,
    className: PropTypes.string,
    className2: PropTypes.string,
    className3: PropTypes.string,
    nameChart: PropTypes.string
}

export default ColumnChart
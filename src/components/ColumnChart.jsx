import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const ColumnChart = () => {
    const orderData = [
        { day: 'Mon', completed: 80, pending: 50 },
        { day: 'Tue', completed: 120, pending: 70 },
        { day: 'Wed', completed: 90, pending: 60 },
        { day: 'Thu', completed: 60, pending: 40 },
        { day: 'Fri', completed: 70, pending: 50 },
        { day: 'Sat', completed: 90, pending: 60 },
        { day: 'Sun', completed: 100, pending: 70 },
    ];
    return (
        <div className="bg-white p-4 rounded-lg shadow w-[calc(50%-10px)]">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold">Total orders</h2>
                    <p className="text-sm text-gray-500">Last 7 days</p>
                </div>
                <div className="flex items-center">
                    <span className="text-2xl font-bold">16,247</span>
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">-6.8%</span>
                </div>
            </div>
        
            <div className="h-40 w-full flex justify-center items-center">
                <div className="w-1/3 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={orderData} barGap={2}>
                            <Bar dataKey="completed" fill="#4F7DF2" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="pending" fill="#E5EBF9" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        
            <div className="flex justify-between mt-2">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Completed</span>
                </div>
                <span className="text-sm font-semibold">52%</span>
            </div>
        
            <div className="flex justify-between mt-1">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-100 mr-2"></div>
                    <span className="text-sm">Pending payment</span>
                </div>
                <span className="text-sm font-semibold">48%</span>
            </div>
        </div>
    )   
}

export default ColumnChart
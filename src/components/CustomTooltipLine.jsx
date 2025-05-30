const CustomTooltipLine = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center text-sm">
                            <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className="text-gray-600 mr-2">
                                {entry.dataKey === 'customers' ? 'New customers:' : 'Average:'}
                            </span>
                            <span className="font-medium text-gray-900">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default CustomTooltipLine
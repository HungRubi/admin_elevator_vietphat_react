const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const total = payload.reduce((sum, entry) => sum + entry.value, 0);

        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry, index) => {
                        const percent = ((entry.value / total) * 100).toFixed(1);
                        return (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: entry.color }}
                                    ></div>
                                    <span className="text-sm text-gray-600">{entry.name}:</span>
                                </div>
                                <span className="text-sm font-semibold ml-3">
                                    {`${entry.value} (${percent}%)`}
                                </span>
                            </div>
                        );
                    })}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-800">Total:</span>
                            <span className="text-sm font-bold">{total}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;

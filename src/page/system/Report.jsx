import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function Report() {
    const [dateRange, setDateRange] = useState('thisMonth');
    const [filterCategory, setFilterCategory] = useState('all');

    const revenueData = [
        { date: '01/04', revenue: 1200, target: 1000 },
        { date: '02/04', revenue: 1500, target: 1000 },
        { date: '03/04', revenue: 1300, target: 1000 },
        { date: '04/04', revenue: 1800, target: 1000 },
        { date: '05/04', revenue: 2000, target: 1000 },
        { date: '06/04', revenue: 1750, target: 1000 },
        { date: '07/04', revenue: 1650, target: 1000 },
    ];

    const categoryData = [
        { name: 'Điện thoại', value: 35 },
        { name: 'Máy tính', value: 25 },
        { name: 'Phụ kiện', value: 20 },
        { name: 'Tivi', value: 15 },
        { name: 'Khác', value: 5 },
    ];

    const channelData = [
        { name: 'Trực tuyến', sales: 4200, returns: 400 },
        { name: 'Cửa hàng', sales: 3100, returns: 200 },
        { name: 'Đại lý', sales: 2300, returns: 300 },
        { name: 'Khác', sales: 1200, returns: 100 },
    ];

    const detailData = [
        { id: 1, date: '05/04/2025', product: 'iPhone 15 Pro', quantity: 12, revenue: 1560, channel: 'Trực tuyến' },
        { id: 2, date: '05/04/2025', product: 'Samsung S25', quantity: 8, revenue: 920, channel: 'Cửa hàng' },
        { id: 3, date: '04/04/2025', product: 'MacBook Air', quantity: 5, revenue: 1250, channel: 'Trực tuyến' },
        { id: 4, date: '04/04/2025', product: 'Tai nghe AirPods', quantity: 15, revenue: 450, channel: 'Đại lý' },
        { id: 5, date: '03/04/2025', product: 'iPad Pro', quantity: 7, revenue: 875, channel: 'Cửa hàng' },
    ];

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalSales = channelData.reduce((sum, item) => sum + item.sales, 0);
    const totalReturns = channelData.reduce((sum, item) => sum + item.returns, 0);
    const transactionCount = detailData.reduce((sum, item) => sum + item.quantity, 0);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="bg-gray-100 w-full pt-8">
            <div className="max-w-full mx-[30px]">
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Báo cáo thống kê</h1>
                        <div className="flex space-x-2">
                            <select 
                                className="border border-gray-300 rounded px-3 py-1"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                            >
                                <option value="today">Hôm nay</option>
                                <option value="yesterday">Hôm qua</option>
                                <option value="thisWeek">Tuần này</option>
                                <option value="thisMonth">Tháng này</option>
                                <option value="custom">Tùy chỉnh...</option>
                            </select>
                            <select
                                className="border border-gray-300 rounded px-3 py-1"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="all">Tất cả danh mục</option>
                                <option value="phone">Điện thoại</option>
                                <option value="computer">Máy tính</option>
                                <option value="accessory">Phụ kiện</option>
                                <option value="tv">Tivi</option>
                            </select>
                            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                                Xuất báo cáo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-gray-500 text-sm">Tổng doanh thu</div>
                        <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} đ</div>
                        <div className="text-green-500 text-sm">+12.5% so với kỳ trước</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-gray-500 text-sm">Tổng đơn hàng</div>
                        <div className="text-2xl font-bold">{totalSales.toLocaleString()}</div>
                        <div className="text-green-500 text-sm">+8.2% so với kỳ trước</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-gray-500 text-sm">Đơn hàng hoàn trả</div>
                        <div className="text-2xl font-bold">{totalReturns.toLocaleString()}</div>
                        <div className="text-red-500 text-sm">+2.1% so với kỳ trước</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-gray-500 text-sm">Số lượng giao dịch</div>
                        <div className="text-2xl font-bold">{transactionCount.toLocaleString()}</div>
                        <div className="text-green-500 text-sm">+5.7% so với kỳ trước</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Doanh thu theo ngày</h2>
                        <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Doanh thu" />
                            <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeDasharray="5 5" name="Mục tiêu" />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Phân bổ theo danh mục</h2>
                        <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="70%" height="100%">
                            <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="w-1/4">
                            {categoryData.map((entry, index) => (
                            <div key={index} className="flex items-center mb-1">
                                <div 
                                className="w-3 h-3 mr-2 rounded-sm" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-xs">{entry.name}</span>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow lg:col-span-1">
                        <h2 className="text-lg font-semibold mb-4">Doanh số theo kênh</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={channelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" scale="band" width={80} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#3B82F6" name="Doanh số" />
                                <Bar dataKey="returns" fill="#EF4444" name="Hoàn trả" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                
                    <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Chi tiết giao dịch</h2>
                            <div className="flex space-x-2">
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm..." 
                                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                                />
                                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                    <option value="all">Tất cả kênh</option>
                                    <option value="online">Trực tuyến</option>
                                    <option value="store">Cửa hàng</option>
                                    <option value="dealer">Đại lý</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kênh</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {detailData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.product}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.revenue.toLocaleString()} đ</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.channel}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-4 text-sm">
                            <div>Hiển thị 1-5 của 42 kết quả</div>
                            <div className="flex space-x-1">
                                <button className="px-3 py-1 border border-gray-300 rounded">Trước</button>
                                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                                <button className="px-3 py-1 border border-gray-300 rounded">2</button>
                                <button className="px-3 py-1 border border-gray-300 rounded">3</button>
                                <button className="px-3 py-1 border border-gray-300 rounded">Sau</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
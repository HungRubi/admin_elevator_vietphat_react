import { useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

import { Combobox, Empty, PageTitle, CircleButton, ColumnChart, Button, PageBar } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { formatMony } from "../../util/formatMony";
import { NavLink } from 'react-router-dom';
export default function Report() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    const timeOption = [
        {id: "hôm nay", text: "Hôm nay"},
        {id: "hôm qua", text: "Hôm qua"},
        {id: "tuần này", text: "Tuần này"},
        {id: "tháng này", text: "Tháng này"},
        {id: "năm này", text: "Năm này"},
        {id: "tùy chọn", text: "Tùy chọn"},
    ]
    const dispatch = useDispatch();
    const [valueDate, setValueDate] = useState({
        date: "tuần này",
        startDate: "",
        endDate: ""
    }) 
    useEffect(() => {
        dispatch(actions.getReport("date", valueDate.date));
        dispatch(actions.getReprotWeek());
    }, [dispatch, valueDate])
    const { 
        summaryReport, dataReportWeek, dataCategoryChart, topSpenders, 
        productTren, formatComment, columnComment, warehouseReport} 
    = useSelector(state => state.app);
    const [current, setCurrent] = useState(1);
    const limit = 5;
    const lastCurrentIndex = current * limit;
    const firstCurrentIndex = lastCurrentIndex - limit;
    const currentWarehouse = warehouseReport?.slice(firstCurrentIndex, lastCurrentIndex);
    const handleChange = (e, selected) => {
        setValueDate({
            ...valueDate,
            [e.target.name]: selected ? selected.id || selected._id : e.target.value 
        })
    }
    const colors = ['#2B7FFF', '#DBEAFE', '#F59E0B', '#10B981', '#EF4444', '#6366F1'];
    const columnProductTrend = productTren.map((item, index) => (
        {
            name: item.name,
            color: colors[index % colors.length] 
        }
    ))
    const chartData = [
        productTren.reduce((acc, p) => {
            acc['day'] = 'Total';
            acc[p.name] = p.totalSold;
            return acc;
        }, {})
    ];
    return (
        <div className="bg-gray-100 w-full pt-8">
            <PageTitle title={"Report"}/>
            <div className="max-w-full mx-[30px]">
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Báo cáo thống kê</h1>
                        <div className="flex space-x-2">
                            <Combobox
                                className={"-mt-5 w-60"}
                                isLable={"hidden"}
                                data={timeOption}
                                name={"date"}
                                onChange={handleChange}
                                selected={valueDate.date}                        
                            />
                            <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 shadow">
                                Xuất báo cáo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {summaryReport.length > 0 && summaryReport?.map((item, index) => (
                        <div key={index}
                        className="bg-white p-4 rounded-lg shadow">
                            <div className="text-gray-500 text-sm">{item.name}</div>
                            <div className="text-2xl font-bold">
                                {formatMony(item.count)}
                                {item.name === "Tổng doanh thu" ? " đ" : ""}
                            </div>
                            <div className={`text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.change >= 0 ? '+' : ''}{item.change}% so với kỳ trước
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Doanh thu theo ngày</h2>
                        <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataReportWeek} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                        {dataCategoryChart.length > 0 ? (
                            <div className="h-64 flex items-center justify-center gap-10">
                                <ResponsiveContainer width="70%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={dataCategoryChart}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {dataCategoryChart?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="w-1/4">
                                    {dataCategoryChart?.map((entry, index) => (
                                        <div key={index} className={`flex items-center mb-1 ${index === 0 ? "-mt-10" : "mt-3"} `}>
                                            <div 
                                            className="w-3 h-3 mr-2 rounded-sm" 
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            ></div>
                                            <span className="text-xs">{entry.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full flex items-center justify-center">
                                <Empty />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Khách hàng mua nhiều nhất</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full shadow">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Purchase</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {topSpenders?.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center gap-2.5">
                                                    <NavLink to={`/user/${item._id}/edit`}>
                                                        <CircleButton>
                                                            <img src={item.avatar} alt="ảnh sản phẩm" 
                                                            className='w-full object-cover rounded-[50%]'/>
                                                        </CircleButton>
                                                    </NavLink>
                                                    <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                        {item.account}
                                                    </h5>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.address}</td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatMony(item.totalSpent)}đ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-white px-4 pt-4 rounded-lg shadow lg:col-span-2 ">
                        <div className="pt-5">
                            <h2 className="text-lg font-semibold">Danh sách hàng tồn kho</h2>
                            <span className='text-xs text-gray-400'>Số lượng hàng còn tồn trong kho sắp xếp giảm dần</span>
                        </div>
                        <div className="overflow-x-auto mt-10">
                            <table className="min-w-full shadow">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentWarehouse?.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 w-1/2">
                                                <div className="flex items-center gap-2.5">
                                                    <NavLink to={`/product/${item.productId?._id}/edit`}>
                                                        <div className="w-full flex justify-center">
                                                            <img src={item.productId?.thumbnail_main} alt="ảnh sản phẩm" 
                                                            className='w-[70px] h-[70px] rounded-[5px] border-custom flex-none'/>
                                                        </div>
                                                    </NavLink>
                                                    <h5 className="font-medium text-gray-900 line-clamp-2">
                                                        {item.productId?.name}
                                                    </h5>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-gray-900">{item.productId?.supplier?.name}</td>
                                            <td className="px-3 py-2">
                                                <Button className={item.status === "còn hàng" ? "!border-[#90d67f] !py-[0] bg-[#d9fbd0] text-main capitalize !text-[11px]" : "hidden"}>
                                                    {item.status}
                                                </Button>
                                                <Button className={item.status === "hết hàng" ? "!border-red-500 !py-[0] bg-red-200 text-red-600 capitalize !text-[11px]" : "hidden"}>
                                                    {item.status}
                                                </Button>
                                                <Button className={item.status === "sắp hết hàng" ? "!border-yellow-500 !py-[0] bg-yellow-200 text-yellow-600 capitalize !text-[11px]" : "hidden"}>
                                                    {item.status}
                                                </Button>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.stock}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <PageBar 
                                currentPage={current} 
                                totalPage={Math.ceil(warehouseReport.length / limit)} 
                                onPageChange={setCurrent}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <ColumnChart 
                            data={chartData}
                            className={"!w-full"}
                            column={columnProductTrend}
                            nameChart={"Top sản phẩm bán chạy"}
                        />
                        <ColumnChart 
                            data={formatComment}
                            className={"!w-full"}
                            column={columnComment}
                            nameChart={"Số lượng đánh giá"}
                            className2={"flex items-center justify-center gap-2.5"}
                            className3={"!mt-5"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
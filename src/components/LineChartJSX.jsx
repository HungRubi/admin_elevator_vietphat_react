import { useDispatch, useSelector } from 'react-redux';
import {LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import CustomTooltipLine from './CustomTooltipLine';
import { useEffect } from 'react';
import * as actions from "../store/actions"

const LineChartJSX = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getNewUser())
    }, [dispatch])
    const {newUserData, summaryUser} = useSelector(state => state.app);
    return (
        <div className="bg-white p-4 rounded-lg shadow w-[calc(50%-10px)]">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold">New customers</h2>
                    <p className="text-sm text-gray-500">Last 7 days</p>
                </div>
                <div className="flex items-center">
                    <span className="text-2xl font-bold">{summaryUser?.totalNewCustomers}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${summaryUser?.growthPercentage < 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {summaryUser?.growthPercentage}% 
                    </span>
                </div>
            </div>

            <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={newUserData}>
                        <XAxis dataKey="day" hide />
                        <Tooltip content={<CustomTooltipLine/>}/>
                        <Line type="monotone" dataKey="customers" stroke="#4F7DF2" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="average" stroke="#E5EBF9" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
                <span>{summaryUser?.startDate}</span>
                <span>{summaryUser?.endDate}</span>
            </div>
        </div>
    )
}

export default LineChartJSX
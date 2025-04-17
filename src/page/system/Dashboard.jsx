import { NavLink } from 'react-router-dom';
import  {StatusIcon, CircleButton, Search, Button, PageBar, PageTitle } from '../../components';
import icon from '../../util/icon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions'
import { formatMony } from '../../util/formatMony';
const { PiDotsThreeBold, MdAutoFixHigh, RiDeleteBin6Line, FaStar, FaPause, IoClose, FaRegStar} = icon;

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getComment())
    }, [dispatch])
    const { comment, order } = useSelector(state => state.app);

    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastComment = current * limit;
    const fistComment = lastComment - limit;
    const currentComment = comment.slice(fistComment, lastComment);
    const totalPage = Math.ceil(comment?.length / limit);

    const getOrdersThisMonthByStatus = (orders) => {
        const now = new Date();
        const currentMonth = now.getMonth(); // từ 0 - 11
        const currentYear = now.getFullYear();
        
        const ordersThisMonth = orders.filter((order) => {
            const createdAt = new Date(order.createdAt);
            return (
                createdAt.getMonth() === currentMonth &&
                createdAt.getFullYear() === currentYear
            );
        });
      
        const allOrders = ordersThisMonth;
      
        const processingAndShipping = ordersThisMonth.filter(
            (order) => order.status === 'Đang xử lý' || order.status === 'Đang giao hàng'
        );
      
        const failedOrders = ordersThisMonth.filter(
            (order) => order.status === 'Thất bại'
        );
      
        return {
            allOrders,
            processingAndShipping,
            failedOrders,
        };
    };
    const {allOrders, processingAndShipping, failedOrders} = getOrdersThisMonthByStatus(order)
    
    return (
        <div className="full py-5">
            <PageTitle title="Dashboard" />
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-1/2">
                    <div className="w-full">
                        <h2 className="text-[35px] font-[600]">Dashboard</h2>
                        <h5 className="text-[12px] text-[#6d6c6c]">Your Recent Website Overview Report</h5>
                    </div>
                    <div className="w-full mt-10 flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            <StatusIcon>
                                <CircleButton className={"!bg-[#D9FBD0] border-3 border-[#f3f3f3] absolute left-3.5 bottom-3.5"}>
                                    <FaStar className='text-[#25B003] -trans_icon_status'/>
                                </CircleButton>
                            </StatusIcon>
                            <div className='text-[24px] text-color leading-5'>
                                <h5 className='font-[600]'>{allOrders?.length} New orders</h5>
                                <span className='sub_text'>All orders in the month</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <StatusIcon className="!bg-[#FFCC85]">
                                <CircleButton className={"!bg-[#FFEFCA] border-3 border-[#f3f3f3] absolute left-3.5 bottom-3.5"}>
                                    <FaPause className='text-[#E5780B] -trans_icon_status'/>
                                </CircleButton>
                            </StatusIcon>
                            <div className='text-[24px] text-color leading-5'>
                                <h5 className='font-[600]'>{processingAndShipping?.length} Process orders</h5>
                                <span className='sub_text'>Orders in progress or in transit</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <StatusIcon className="!bg-[#F48270]">
                                <CircleButton className={"!bg-[#FFE0DB] border-3 border-[#f3f3f3] absolute left-3.5 bottom-3.5"}>
                                    <IoClose className='text-[#FA3B1D] -trans_icon_status text-[20px]'/>
                                </CircleButton>
                            </StatusIcon>
                            <div className='text-[24px] text-color leading-5'>
                                <h5 className='font-[600]'>{failedOrders?.length} Failed orders</h5>
                                <span className='sub_text'>Orders cancelled by customers</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">

                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="w-full flex items-center justify-between py-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>Latest reviews</h5>
                        <span className='text-[12px] text-[#888]'>
                            Payment received across all channels
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-1/2 gap-3">
                        <div className="w-1/2">
                            <Search className={"!rounded-[5px]"}/>
                        </div>
                        <Button>All reviews</Button>
                        <Button className={"!px-3"}>
                            <PiDotsThreeBold className='text-[20px]'/>
                        </Button>
                    </div>
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" class="py-3"></th>
                                <th scope="col" class="px-4 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Customer
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Rating
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Review
                                </th>
                                <th scope="col" class="py-3 text-center">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentComment?.map(item => (
                                <tr key={item._id}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td class="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td class="py-4 w-1/14 ">
                                        <div className="w-full flex justify-center">
                                            <img src={item.product_id[0].thumbnail_main} alt="ảnh sản phẩm" 
                                            className='w-[70px] h-[70px] rounded-[5px] border-custom'/>
                                        </div>
                                    </td>
                                    <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-2/14">
                                        {item.product_id[0].name}
                                    </th>
                                    
                                    <td class="px-4 py-4 w-2/15">
                                        <div className="flex items-center gap-2.5">
                                            <CircleButton>
                                                <img src={item.user_id.avatar} alt="ảnh sản phẩm" 
                                                className='w-full object-cover rounded-[50%]'/>
                                            </CircleButton>
                                            <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {item.user_id.name}   
                                            </h5>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 w-1/11 whitespace-nowrap">
                                        {item.product_id[0].category.name}
                                    </td>
                                    <td class="px-4 py-4 w-1/13">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, index) => (
                                                index < item.star ? (
                                                    <FaStar key={index} className='text-[13px] text-yellow-500'/>
                                                ) : (
                                                    <FaRegStar key={index} className='text-[13px] text-yellow-500'/>
                                                )
                                            ))}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 w-1/13">
                                        ₫ {formatMony(item.product_id[0].price)}
                                    </td>
                                    <td class="px-4 py-4 w-3/12 text-justify">
                                        {item.message}
                                    </td>
                                    
                                    <td class="py-4 w-2/12 text-center">
                                    <span className='time_text'>18/04/2002</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <NavLink>
                                                <Button className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}>
                                                    <RiDeleteBin6Line className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <NavLink>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <PiDotsThreeBold className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
import { NavLink } from 'react-router-dom';
import  {
        StatusIcon, CircleButton, Search, 
        Button, PageBar, PageTitle, MonthlyChart, 
        Empty, ColumnChart, LineChartJSX,
        CircleChart,
        SemiCircle
    } from '../../components';
import icon from '../../util/icon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions'
import { formatMony } from '../../util/formatMony';
const { PiDotsThreeBold, MdAutoFixHigh, RiDeleteBin6Line, FaStar, FaPause, IoClose, FaRegStar} = icon;

const Dashboard = () => {
    const calculateTotalRows = (comments) => {
        if (!comments || !Array.isArray(comments)) return 0;
        
        return comments.reduce((total, comment) => {
            const productCount = Array.isArray(comment.product_id) ? comment.product_id.length : 1;
            return total + productCount;
        }, 0);
    };
    const getCommentsForCurrentPage = (comments, currentPage, limitPerPage) => {
        if (!comments || !Array.isArray(comments)) return [];
        let rowCount = 0;
        let result = [];
        let startRow = (currentPage - 1) * limitPerPage;
        let endRow = startRow + limitPerPage;
            
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            const products = Array.isArray(comment.product_id) ? comment.product_id : [];
            const productCount = products.length || 1;
            
            // Nếu tất cả các hàng của comment này đều dưới startRow, bỏ qua
            if (rowCount + productCount <= startRow) {
                rowCount += productCount;
                continue;
            }
            
            if (rowCount >= endRow) break;
            
            // Tính các sản phẩm nằm trong phạm vi trang hiện tại
            const productsInRange = [];
            for (let j = 0; j < products.length; j++) {
                if (rowCount >= startRow && rowCount < endRow) {
                    productsInRange.push(products[j]);
                }
                rowCount++;
            }
            
            // Nếu có sản phẩm nằm trong phạm vi, thêm comment này vào kết quả
            if (productsInRange.length > 0) {
                result.push({
                    ...comment,
                    product_id: productsInRange
                });
            }
        }
        return result;
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getComment());
        dispatch(actions.getOrder());
        dispatch(actions.getTotalOrderLastWeek());
    }, [dispatch])
    const { comment, order, dataTotalOrder, summaryOrder } = useSelector(state => state.app);
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const currentComment = getCommentsForCurrentPage(comment, current, limit);
    const totalRows = calculateTotalRows(comment);
    const totalPage = Math.ceil(totalRows / limit);

    const getOrdersThisMonthByStatus = (orders) => {
        const now = new Date();
        const currentMonth = now.getMonth(); // từ 0 - 11
        const currentYear = now.getFullYear();
        
        const ordersThisMonth = orders?.filter((order) => {
            const createdAt = new Date(order.createdAt);
            return (
                createdAt.getMonth() === currentMonth &&
                createdAt.getFullYear() === currentYear
            );
        });
      
        const allOrders = ordersThisMonth;
      
        const processingAndShipping = ordersThisMonth?.filter(
            (order) => order.status === 'Đang xử lý' || order.status === 'Đang giao hàng'
        );
      
        const failedOrders = ordersThisMonth?.filter(
            (order) => order.status === 'Thất bại'
        );
      
        return {
            allOrders,
            processingAndShipping,
            failedOrders,
        };
    };
    const {allOrders, processingAndShipping, failedOrders} = getOrdersThisMonthByStatus(order)

    
    const [valueDate, setValueDate] = useState({
        startDate: '',
        endDate: '',
    })
    const onChangeDate = (e) => {
        setValueDate({
            ...valueDate,
            [e.target.name]: e.target.value
        })
    }
    const filterComment = [
        {id: 1, text: "1 Sao"},
        {id: 2, text: "2 Sao"},
        {id: 3, text: "3 Sao"},
        {id: 4, text: "4 Sao"},
        {id: 5, text: "5 Sao"},
    ]
    const handleChange = (e) => {
        const newValue = e.target.value;
        if(newValue === 1){
            dispatch(actions.filterComment("star",newValue))
        }else if(newValue === 2){
            dispatch(actions.filterComment("star",newValue))
        }else if(newValue === 3){
            dispatch(actions.filterComment("star",newValue))
        }else if(newValue === 4){
            dispatch(actions.filterComment("star",newValue))
        }else if(newValue === 5){
            dispatch(actions.filterComment("star",newValue))
        }else{
            dispatch(actions.getComment())
        }
    }
    const handleSearch = (value) => {
        dispatch(actions.getComment(value))
    }
    const columnToTalOrder = [
        {
            name: "completed",
            color: "#2B7FFF",
        },
        {
            name: "pending",
            color: "#DBEAFE",
        },
    ]
    return (
        <div className="full pt-5">
            <PageTitle title="Dashboard" />
            <div className="w-full px-[30px] flex gap-5">
                <div className="w-1/2">
                    <div className="w-full">
                        <h2 className="text-[35px] font-[600]">Dashboard</h2>
                        <h5 className="text-sm text-[#6d6c6c]">Your Recent Website Overview Report</h5>
                    </div>
                    <div className="w-full mt-10 flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            <StatusIcon>
                                <CircleButton className={"!bg-[#D9FBD0] border-3 border-[#f3f3f3] absolute left-3.5 bottom-3.5"}>
                                    <FaStar className='text-[#25B003] -trans_icon_status'/>
                                </CircleButton>
                            </StatusIcon>
                            <div className='text-[24px] text-color leading-5'>
                                <h5 className='font-[600]'>{allOrders?.length} orders</h5>
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
                                <h5 className='font-[600]'>{processingAndShipping?.length} orders</h5>
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
                                <h5 className='font-[600]'>{failedOrders?.length} orders</h5>
                                <span className='sub_text'>Orders cancelled by customers</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-10 pt-10 border-t border-gray-300">
                        <MonthlyChart />
                    </div>
                </div>
                <div className="w-1/2 flex gap-5 flex-wrap">
                    <ColumnChart 
                        data={dataTotalOrder} 
                        summary={summaryOrder}
                        column={columnToTalOrder}
                    />
                    <LineChartJSX/>
                    <CircleChart/>
                    <SemiCircle/>
                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="w-full flex items-center justify-between pt-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>Latest reviews</h5>
                        <span className='text-[12px] text-[#888]'>
                            Payment received across all channels
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-5">
                    <div className="flex flex-col">
                        <input 
                            type="date"
                            onChange={onChangeDate} 
                            name="startDate"
                            className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input 
                            type="date" 
                            onChange={onChangeDate}
                            name="endDate"
                            className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <div className="w-1/3">
                        <select 
                            onChange={handleChange}
                            className={`w-full border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                            aria-label="Filter orders"
                        >
                            <option value="">--- Filter Comment ---</option>
                            {filterComment.map((item, index) => (
                                <option key={index} value={item.id}>{item.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <Search 
                            className={"!rounded-lg"} 
                            placeholder="Enter order code..." 
                            onSearch={handleSearch}
                        />
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-8">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" className="py-3"></th>
                                <th scope="col" className="px-4 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Customer
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Rating
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Review
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {comment && comment.length > 0 ? 
                            currentComment?.flatMap(item => 
                                // Kiểm tra nếu product_id là một mảng và có phần tử
                                Array.isArray(item.product_id) && item.product_id.length > 0 ?
                                    // Map qua từng sản phẩm trong product_id
                                    item.product_id.map((product, productIndex) => (
                                        <tr key={`${item._id}-${productIndex}`}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                            <td className="px-2 py-4 w-[15px]">
                                                <input type="checkbox" className='scale-120'/>
                                            </td>
                                            <td className="py-4 w-1/14 ">
                                                <div className="w-full flex justify-center">
                                                    <img src={product?.thumbnail_main} alt="ảnh sản phẩm" 
                                                        className='w-[70px] h-[70px] rounded-[5px] border-custom'/>
                                                </div>
                                            </td>
                                            <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/14">
                                                <span className='line-clamp-1'>{product?.name}</span>
                                            </th>
                                            
                                            <td className="px-4 py-4 w-2/15">
                                                <div className="flex items-center gap-2.5">
                                                    <CircleButton>
                                                        <img 
                                                            src={
                                                            item?.user_id?.avatar?.startsWith('/uploads')
                                                                ? `${import.meta.env.VITE_SERVER_URL}${item?.user_id?.avatar}`
                                                                : item?.user_id?.avatar
                                                            } 
                                                            alt="avatar" 
                                                            className='w-full object-cover rounded-[50%]'
                                                        />
                                                    </CircleButton>
                                                    <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                        {item.user_id.name}   
                                                    </h5>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 w-1/11 whitespace-nowrap">
                                                {product?.category?.name}
                                            </td>
                                            <td className="px-4 py-4 w-1/13">
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
                                            <td className="px-4 py-4 w-1/13">
                                                ₫ {formatMony(product?.price)}
                                            </td>
                                            <td className="px-4 py-4 w-3/12 text-justify">
                                                {item.message}
                                            </td>
                                            
                                            <td className="py-4 w-2/12 text-center">
                                                <span className='time_text'>{item.formatDate}</span>
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
                                    ))
                                : 
                                <Empty
                                    title={"No product information available"}
                                    subTitle={"This comment has no associated products."}
                                />
                            )
                        : (
                            <Empty
                                title={"No comments found"}
                                subTitle={"Try adjusting your search or filter to find what you're looking for."}
                            />
                        )}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
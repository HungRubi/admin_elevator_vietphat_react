import  { Search, Button,CircleButton, PageBar } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line} = icon;

const Order = () => {
    const dispatch = useDispatch();
    const { order, totalPage } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getOrder())
    }, [])
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastOrderIndex = current * limit;
    const firstOrderIndex = lastOrderIndex - limit;

    const currentOrder = order.slice(firstOrderIndex, lastOrderIndex);
    
    return (
        <div className="full py-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/order'} className={"text-blue-600"}>
                            Order
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Order</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of orders of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/order/add'}>
                            <Button className={"gap-2.5 !py-2 !border-none bg-blue-400 text-white hover:bg-blue-500"}>
                                <IoMdAdd/>
                                Add
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="w-full flex items-center justify-between py-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>List of orders</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of orders of your company
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
                                <th scope="col" class="px-4 py-3">
                                    user
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    order code
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    order date
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    address
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    payment
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    voucher
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    status
                                </th>
                                <th scope="col" class="py-3 text-center">
                                    time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder.map((item) => (
                                <tr key={item._id} 
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td class="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <th scope="row" class="px-4 py-4  w-2/14">
                                        <div className="flex items-center gap-2.5">
                                            <CircleButton>
                                                <img src={item.userAvatar} alt={item.userName}
                                                className='w-full object-cover rounded-[50%]'/>
                                            </CircleButton>
                                            <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                            {item.userName}
                                            </h5>
                                        </div>
                                    </th>
                                    <td class="px-4 py-4 w-2/14">
                                        {item.order_code}
                                    </td>
                                    <td class="px-4 py-4 w-2/22">
                                        {item.orderDate}
                                    </td>
                                    <td class="px-4 py-4 w-2/15">
                                        {item.shipping_address.address}
                                    </td>
                                    <td class="px-4 py-4 w-2/15">
                                        {item.payment_method}
                                    </td>
                                    <td class="px-4 py-4 w-2/15">
                                        {item.discountName}
                                    </td>
                                    <td class="px-4 py-4 w-2/20">
                                        <Button className={item.status === "Thành công" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "Đang xử lý" ? "!border-[#ffcc85] !py-[2px] bg-[#ffefca] text-[#bc3803]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "Thất bại" ? "!border-[#f74d4d8a] !py-[2px] bg-[#ff8585a6] text-[#c90c05]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                    </td>
                                    <td class="py-4 w-3/12 text-center">
                                        <span className='time_text'>{item.lastUpdate}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/order/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <NavLink to={`/order/${item._id}/delete`}>
                                                <Button className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}>
                                                    <RiDeleteBin6Line className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                <PiDotsThreeBold className='text-[18px]'/>
                                            </Button>
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
export default Order
import  { Search, Button,CircleButton, PageBar, PageTitle, Combobox, Input, ModalToast } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions'
const { MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line} = icon;

const Order = () => {
    const dispatch = useDispatch();
    const { order, totalPage } = useSelector(state => state.app);
    const [ valueDate, setValueDate ] = useState({
        startDate: '',
        endDate: ''
    })
    const onChangeDate = (e) => {
        setValueDate({
            ...valueDate,
            [e.target.name] : e.target.value,
        })
    }
    useEffect(() => {
        if (valueDate.startDate && valueDate.endDate) {
            dispatch(actions.filterOrder("from_date", valueDate.startDate, "to_date", valueDate.endDate));
        }
    }, [valueDate, dispatch]);
    const [current, setCurrent] = useState(1);
    const [valueSearch, setValueSearch] = useState('');
    const limit = 10;
    const lastOrderIndex = current * limit;
    const firstOrderIndex = lastOrderIndex - limit;
    const currentOrder = order?.slice(firstOrderIndex, lastOrderIndex);
    const filterType = [
        { id: 1, text: "Tất cả" },
        { id: 2, text: "Đang giao hàng" },
        { id: 3, text: "Đang xử lý" },
        { id: 4, text: "Thành công" },
        { id: 5, text: "Thất bại" },
        { id: 6, text: "Thanh toán khi nhận hàng" },
        { id: 7, text: "Ví điện tử Momo" },
        { id: 8, text: "Atm nội địa" },
    ];
    const [selected, setSelected] = useState("");
    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelected(newValue);
        if(newValue === "Đang giao hàng"){
            dispatch(actions.filterOrder("status", "Đang giao hàng"))
        }else if(newValue === "Đang xử lý"){
            dispatch(actions.filterOrder("status", "Đang xử lý"))
        }else if(newValue === "Thành công"){
            dispatch(actions.filterOrder("status", "Thành công"))
        }else if(newValue === "Thất bại"){
            dispatch(actions.filterOrder("status", "Thất bại"))
        }else if(newValue === "Thanh toán khi nhận hàng"){
            dispatch(actions.filterOrder("payment_method", "Thanh toán khi nhận hàng"))
        }else if(newValue === "Ví điện tử Momo"){
            dispatch(actions.filterOrder("payment_method", "Ví điện tử Momo"))
        }else if(newValue === "Atm nội địa"){
            dispatch(actions.filterOrder("payment_method", "Atm nội địa"))
        }else{
            dispatch(actions.getOrder())
        }
    }
    const handleSearch = (value) => {
        setValueSearch(value);
        dispatch(actions.getOrder(valueSearch));
    };
    const [isModal, setIsModal] = useState(false);
    const [idDeleted, setIdDeleted] = useState('')
    const handleOnDelete = () => {
        dispatch(actions.deleteOrder(idDeleted))
    }
    return (
        <div className="full pt-5">
            <PageTitle title="Order" />
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
                <div className="w-full flex flex-col gap-6 py-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>List of orders</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of orders of your company
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-1/3">
                                <Search 
                                    className={"!rounded-[5px]"} 
                                    placeholder="Enter order code..." 
                                    onSearch={handleSearch}
                                />
                            </div>
                            <div className="w-1/3">
                                <select 
                                    value={selected} 
                                    onChange={handleChange}
                                    className={`w-full border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                                    aria-label="Filter orders"
                                >
                                    <option value="">--- Filter Orders ---</option>
                                    {filterType.map((item, index) => (
                                        <option key={index} value={item.text}>{item.text}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input 
                                    type="date"
                                    onChange={onChangeDate} 
                                    name="startDate"
                                    className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input 
                                    type="date" 
                                    onChange={onChangeDate}
                                    name="endDate"
                                    className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right shadow text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    user
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    order code
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    order date
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    address
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    payment
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    voucher
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    status
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder && currentOrder.length > 0 ? currentOrder?.map((item) => (
                                <tr key={item._id} 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <th scope="row" className="px-4 py-4  w-2/14">
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
                                    <td className="px-4 py-4 w-2/17 font-medium text-gray-900">
                                        <span className='line-clamp-2'>{item.order_code}</span>
                                    </td>
                                    <td className="px-4 py-4 w-2/22">
                                        {item.orderDate}
                                    </td>
                                    <td className="px-4 py-4 w-2/11">
                                        {item.shipping_address?.address}
                                    </td>
                                    <td className="px-4 py-4 w-2/15">
                                        {item.payment_method}
                                    </td>
                                    <td className="px-4 py-4 w-2/15">
                                        {item.discountName}
                                    </td>
                                    <td className="px-4 py-4 w-2/20">
                                        <Button className={item.status === "Thành công" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "Đang xử lý" ? "!border-[#ffcc85] !py-[2px] bg-[#ffefca] text-[#bc3803]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "Thất bại" ? "!border-[#f74d4d8a] !py-[2px] bg-[#ff8585a6] text-[#c90c05]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "Đang giao hàng" ? "!border-blue-500 !py-[2px] bg-blue-200 text-blue-600 whitespace-nowrap" : "hidden"}>
                                            {item.status}
                                        </Button>
                                    </td>
                                    <td className="py-4 w-3/12 text-center">
                                        <span className='time_text'>{item.lastUpdate}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/order/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button onClick={() => {
                                                setIsModal(true);
                                                setIdDeleted(item._id);
                                            }}
                                            className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}>
                                                <RiDeleteBin6Line className='text-[18px]'/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <p className="text-lg font-medium">No orders found</p>
                                            <p className="text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                    {isModal && <ModalToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleOnDelete}/>}
                </div>
            </div>
        </div>
    )
}
export default Order
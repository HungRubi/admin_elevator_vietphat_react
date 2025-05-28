import { NavLink } from "react-router-dom"
import { PageTitle, Button, Search, CircleButton, Empty, PageBar, ModalToast } from "../../components"
import icons from "../../util/icon"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../store/actions"
import { useEffect, useState } from "react"

const { MdChevronRight, IoMdAdd, MdAutoFixHigh, RiDeleteBin6Line  } = icons

const Warranty = () => {
    const filterWarranty = [
        { text: "Chấp thuận", id: "chấp thuận" },
        { text: "Đang xử lý", id: "đang xử lý" },
        { text: "Bị hủy", id: "bị hủy" }
    ]
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getWarranty())
    }, [dispatch])
    const  { warranties, totalPage } = useSelector(state => state.app);
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastItemIndex = current * limit;
    const firstItemIndex = lastItemIndex - limit;
    const currentItems = warranties?.slice(firstItemIndex, lastItemIndex);
    const handleSearch = (value) => {
        dispatch(actions.getWarranty(value));
    }
    const [deleteId, setDeleteId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleDelete = () => {
        dispatch(actions.deleteWarranty(deleteId));
    }
    const [selected, setSelected] = useState("");
    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelected(newValue);
        if(newValue === "chấp thuận") {
            dispatch(actions.filterWarranty("status", "chấp thuận"))
        }else if(newValue === "đang xử lý") {
            dispatch(actions.filterWarranty("status", "đang xử lý"))
        }else if(newValue === "bị hủy") {
            dispatch(actions.filterWarranty("status", "bị hủy"))
        }else{
            dispatch(actions.getWarranty())
        }
        console.log(newValue);
    }
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
            dispatch(actions.filterWarranty("startDate", valueDate.startDate, "endDate", valueDate.endDate));
        }else{
            dispatch(actions.getWarranty())
        }
    }, [valueDate, dispatch]);
    return (
        <div className="full pt-5">
            <ModalToast isOpen={isOpen} setIsOpen={setIsOpen} onDelete={handleDelete}/>
            <PageTitle title="Warranty" />
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/warranty'} className={"text-blue-600"}>
                            Warranty
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">
                        Warranty
                    </h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">
                        List of warranty of your website
                    </h5>
                    <div className="flex mt-5">
                        <NavLink to={'/warranty/add'}>
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
                    <div className="flex items-center justify-between">
                        <div className="text-[19px] text-color leading-6">
                            <h5 className='font-[600]'>List of warranty</h5>
                            <span className='text-[12px] text-[#888]'>
                                List of warranty of your company
                            </span>
                        </div>
                        
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <input 
                                type="date"
                                name="startDate"
                                onChange={onChangeDate}
                                value={valueDate.startDate}
                                className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                        </div>
                        <div className="flex flex-col">
                            <input 
                                type="date" 
                                name="endDate"
                                onChange={onChangeDate}
                                value={valueDate.endDate}
                                className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                        </div>
                        <div className="w-1/3">
                            <select 
                                value={selected}
                                className={`w-full border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                                aria-label="Filter orders"
                                onChange={handleChange}
                            >
                                <option value="">--- Filter Warranty ---</option>
                                {filterWarranty.map((item, index) => (
                                    <option key={index} value={item.id}>{item.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <Search 
                                className={"!rounded-lg"} 
                                placeholder="Enter warranty code..." 
                                onSearch={handleSearch}
                            />
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
                                <th scope="col" className="py-3"></th>
                                <th scope="col" className="px-4 py-3">
                                    product
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    customer
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    warranty code
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    order code
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    purchase date
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    warranty date
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
                            {warranties && currentItems.length > 0 ? currentItems.map((item) => (
                                <tr key={item._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td className="py-4 w-1/14 ">
                                        <div className="w-full flex justify-center">
                                            <img src={item.product_id?.thumbnail_main} alt="ảnh sản phẩm" 
                                            className='w-[70px] h-[70px] rounded-[5px] border-custom'/>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/14">
                                        <span className='line-clamp-2'>{item.product_id?.name}</span>
                                    </th>
                                    <th scope="row" className="px-4 py-4  w-2/14">
                                        <div className="flex items-center gap-2.5">
                                            <CircleButton>
                                                <img src={item.user_id?.avatar} alt=""
                                                className='w-full object-cover rounded-[50%]'/>
                                            </CircleButton>
                                            <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {item.user_id?.account}
                                            </h5>
                                        </div>
                                    </th>
                                    <td className="px-4 py-4 w-2/17">
                                        <span className='line-clamp-2'>{item.code}</span>
                                    </td>
                                    <td className="px-4 py-4 w-2/17">
                                        <span className='line-clamp-2'>{item.order_code?.order_code}</span>
                                    </td>
                                    <td className="px-4 py-4 w-2/18">
                                        {item.purchaseDate}
                                    </td>

                                    <td className="px-4 py-4 w-2/18">
                                        {item.warrantyDate}
                                    </td>
                                    <td className="px-4 py-4 w-2/20">
                                        <Button className={item.status === "chấp thuận" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main text-[12px]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "đang xử lý" ? "!border-[#ffcc85] !py-[2px] bg-[#ffefca] text-[#bc3803] text-[12px]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "bị hủy" ? "!border-[#f74d4d8a] !py-[2px] bg-[#ff8585a6] text-[#c90c05] text-[12px]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                    </td>
                                    <td className="py-4 w-3/12 text-center">
                                        <span className='time_text'>{item.createTime}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/warranty/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button 
                                            className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}
                                            onClick={() => {
                                                setDeleteId(item._id);
                                                setIsOpen(true);
                                            }}>
                                                <RiDeleteBin6Line className='text-[18px]'/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <Empty />
                            )}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
        </div>
    )
} 

export default Warranty
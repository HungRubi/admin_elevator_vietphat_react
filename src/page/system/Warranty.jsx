import { NavLink } from "react-router-dom"
import { PageTitle, Button, Search, CircleButton } from "../../components"
import icons from "../../util/icon"

const { MdChevronRight, IoMdAdd, MdAutoFixHigh, RiDeleteBin6Line  } = icons

const Warranty = () => {
    const filterWarranty = []
    return (
        <div className="full pt-5">
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
                                className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                        </div>
                        <div className="flex flex-col">
                            <input 
                                type="date" 
                                name="endDate"
                                className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                        </div>
                        <div className="w-1/3">
                            <select 
                                className={`w-full border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                                aria-label="Filter orders"
                            >
                                <option value="">--- Filter Warranty ---</option>
                                {filterWarranty.map((item, index) => (
                                    <option key={index} value={item.text}>{item.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <Search 
                                className={"!rounded-lg"} 
                                placeholder="Enter order code..." 
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
                                <tr 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <th scope="row" className="px-4 py-4  w-2/14">
                                        <div className="flex items-center gap-2.5">
                                            <CircleButton>
                                                <img src="" alt=""
                                                className='w-full object-cover rounded-[50%]'/>
                                            </CircleButton>
                                            <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                            ""
                                            </h5>
                                        </div>
                                    </th>
                                    <td className="px-4 py-4 w-2/17 font-medium text-gray-900">
                                        <span className='line-clamp-2'></span>
                                    </td>
                                    <td className="px-4 py-4 w-2/22">
                                    </td>
                                    <td className="px-4 py-4 w-2/11">
                                    </td>
                                    <td className="px-4 py-4 w-2/15">
                                    </td>
                                    <td className="px-4 py-4 w-2/15">
                                    </td>
                                    <td className="px-4 py-4 w-2/20">
                                        {/* <Button className={item.status === "Thành công" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main" : "hidden"}>
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
                                        </Button> */}
                                    </td>
                                    <td className="py-4 w-3/12 text-center">
                                        <span className='time_text'></span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/order//edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button 
                                            className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}>
                                                <RiDeleteBin6Line className='text-[18px]'/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 

export default Warranty
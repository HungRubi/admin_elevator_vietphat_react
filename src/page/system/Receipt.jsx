import { NavLink } from "react-router-dom";
import icons from '../../util/icon';
import { Button, Search } from "../../components";
const { MdChevronRight, IoMdAdd } = icons

const Receipt  = () => {
    const filterReceipt = []
    return (
        <div className="w-full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/receipt'} className={"text-blue-600"}>
                            Receipt
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Receipt</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of receipt cooperating with my company</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/receipt/add'}>
                            <Button className={"gap-2.5 !py-1.5 !border-none bg-blue-400 text-white hover:bg-blue-500"}>
                                <IoMdAdd/>
                                Add
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="w-full flex items-center justify-between pt-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>List of video</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of video of your company
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-5 mt-5">
                    <div className="flex flex-col">
                        <input 
                            type="date"
                            name="startDate"
                            className={`w-[250px] flex-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input 
                            type="date" 
                            name="endDate"
                            className={`w-[250px] flex-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <select 
                        className={`w-1/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                        aria-label="Default select example"
                    >
                        <option value="">--- Filter Supplier ---</option>
                        {filterReceipt?.map((item, index) => (
                            <option key={index} value={item.id}>{item.text}</option>
                        ))}
                    </select>
                    <div className="w-1/2">
                        <Search className={"!rounded-lg"}  placeholder={"Enter title discount..."}/>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right shadow text-gray-500 dark:text-gray-400 mt-8">
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
                    <tbdody>

                    </tbdody>
                </table>
            </div>
        </div>
    );
}

export default Receipt;
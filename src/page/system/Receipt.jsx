import { NavLink } from "react-router-dom";
import icons from '../../util/icon';
import { Button, Empty, ModalList, ModalToast, PageBar, Search } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions';
import {formatMony} from '../../util/formatMony';

const { MdChevronRight, IoMdAdd, MdAutoFixHigh, RiDeleteBin6Line, PiDotsThreeBold    } = icons

const Receipt  = () => {
    const dispatch = useDispatch();
    const { receipts, totalPage } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getReceipt());
    }, [dispatch])
    const [current, setCurrent] = useState(1)
    const limit = 10;
    const lastCurrentIndex = current * limit;
    const fistCurrentIndex = lastCurrentIndex - limit;
    const currentReceipt = receipts?.slice(fistCurrentIndex, lastCurrentIndex)
    const filterReceipt = [
        {id: "chưa xác nhận", text: "Chưa xác nhận"},
        {id: "đã xác nhận", text: "Đã xác nhận"},
        {id: "đã hủy", text: "Đã hủy"},
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const handleDelete = () => {
        dispatch(actions.deleteReceipt(deleteId));
    }
    return (
        <div className="w-full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <ModalToast isOpen={isOpen} setIsOpen={setIsOpen} onDelete={handleDelete}/>
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
                        <h5 className='font-[600]'>List of receipt</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of receipt of your company
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
                                receipt code
                            </th>
                            <th scope="col" className="px-4 py-3">
                                supplier
                            </th>
                            <th scope="col" className="px-4 py-3">
                                date entry
                            </th>
                            <th scope="col" className="px-4 py-3">
                                total 
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
                        {currentReceipt && currentReceipt.length > 0 ?
                            currentReceipt.map(item => (
                                <tr key={item._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-4 py-4 w-5 h-20">
                                            <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <th className="px-4 py-4 font-medium text-gray-900 w-3/12">
                                        {item.code}
                                    </th>
                                    <td className="px-4 py-4 w-2/13 font-medium text-gray-900">
                                        {item.supplier.name}
                                    </td>
                                    <td className="px-4 py-4 w-2/13">
                                        {item.dateFormat}
                                    </td>
                                    <td className="px-4 py-4 w-2/13">
                                        {formatMony(item.totalPrice)} đ
                                    </td>
                                    <td className="px-4 py-4 w-2/13">
                                        <Button className={item.status === "đã xác nhận" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "chưa xác nhận" ? "!border-[#ffcc85] !py-[2px] bg-[#ffefca] text-[#bc3803]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "đã hủy" ? "!border-[#f74d4d8a] !py-[2px] bg-[#ff8585a6] text-[#c90c05]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className='time_text'>{item.updateFormat}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[50px] m-auto">
                                            <NavLink to={`/receipt/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button 
                                            className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}
                                            onClick={() => {
                                                setIsOpen(true);
                                                setDeleteId(item._id);
                                            }}
                                            >
                                                <RiDeleteBin6Line className='text-[18px]'/>
                                            </Button>
                                            <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                <PiDotsThreeBold className='text-[18px]'/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            : 
                            (
                                <Empty
                                    title={"Not found receipt"} 
                                    subTitle={"Try adjusting your search or filter to find what you're looking for."}   
                                />
                            )
                        } 
                        
                    </tbody>
                </table>
                <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
            </div>
        </div>
    );
}

export default Receipt;
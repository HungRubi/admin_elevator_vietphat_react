import icons from '../../util/icon';
import { Button, Empty, ModalToast, PageBar, Search } from '../../components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions'

const {IoMdAdd, MdChevronRight, PiDotsThreeBold, MdAutoFixHigh, RiDeleteBin6Line } = icons

const Supplier = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getSuppliers())    
    }, [])
    const filterSupplier = []
    const {totalPage, suppliers} = useSelector((state) => state.app);
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10;
    const lastIndex = currentPage * limit;
    const firstIndex = lastIndex - limit;

    const currentSupplier = suppliers?.slice(firstIndex, lastIndex);

    const [isModal, setIsModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const handleDelete = () => {
        dispatch(actions.deleteSupplier(deleteId));
        setIsModal(false);
    }
    const handleSearch = (search) => {
        dispatch(actions.getSuppliers(search));
    }
    return (
        <div className="w-full pt-5">
            <ModalToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleDelete}/>
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/supplier'} className={"text-blue-600"}>
                            Supplier
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Supplier</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of suppliers cooperating with my company</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/category/supplier/add'}>
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
                        {filterSupplier?.map((item, index) => (
                            <option key={index} value={item.id}>{item.text}</option>
                        ))}
                    </select>
                    <div className="w-1/2">
                        <Search className={"!rounded-lg"}  onSearch={handleSearch} placeholder={"Enter title discount..."}/>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                <input type="checkbox" className='scale-120'/>
                            </th>
                            <th scope="col" className="px-4 py-3">
                                name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-4 py-3">
                                email
                            </th>
                            <th scope="col" className="px-4 py-3">
                                address
                            </th>
                            <th scope="col" className="py-3 text-center">
                                last update
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSupplier && currentSupplier.length > 0 ? currentSupplier.map((item) => (
                            <tr key={item._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                <td className="px-4 py-4 w-5 h-20">
                                        <input type="checkbox" className='scale-120'/>
                                </td>
                                <th className="px-4 py-4 font-medium text-gray-900 dark:text-white truncate w-2/12">
                                    {item.name}
                                </th>
                                <td className="px-4 py-4 w-2/13">
                                    {item.phone}
                                </td>
                                <td className="px-4 py-4 w-2/13">
                                    {item.email}
                                </td>
                                <td className="px-4 py-4 w-4/12">
                                    {item.address}
                                </td>
                                <td className="py-4 text-center">
                                    <span className='time_text'>{item.formatDate}</span>
                                    <div className="option items-center justify-center gap-3 hidden w-[50px] m-auto">
                                        <NavLink to={`/category/supplier/${item._id}/edit`}>
                                            <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                <MdAutoFixHigh className='text-[18px]'/>
                                            </Button>
                                        </NavLink>
                                        <Button 
                                        className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}
                                        onClick={() => {
                                            setIsModal(true);
                                            setDeleteId(item._id);
                                        }}>
                                            <RiDeleteBin6Line className='text-[18px]'/>
                                        </Button>
                                        <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                            <PiDotsThreeBold className='text-[18px]'/>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <Empty 
                                title={"Not found supplier"}
                                subTitle={"Try adjusting your search or filter to find what you're looking for."}
                            />
                        )}
                    </tbody>
                </table>
                    <PageBar currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage}/>
            </div>
            </div>
        </div>
    )
}

export default Supplier
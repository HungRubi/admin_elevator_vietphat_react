import { PageTitle, Button, Search, PageBar, Empty } from "../../components";
import { NavLink } from "react-router-dom";
import icons from "../../util/icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../store/actions";
import { formatMony } from "../../util/formatMony"

const { MdChevronRight, IoMdAdd, MdAutoFixHigh, RiDeleteBin6Line, PiDotsThreeBold } = icons;

const Warehouse = () => {
    const warehouseFilter = [];
    const dispatch = useDispatch();
    const { warehouse, totalPage } = useSelector(state => state.app);
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastCurrentIndex = current * limit;
    const firstCurrentIndex = lastCurrentIndex - limit;
    const currentWarehouse = warehouse?.slice(firstCurrentIndex, lastCurrentIndex);
    useEffect(() => {
        dispatch(actions.getWarehouse());
    }, [dispatch])
    return (
        <div className="full pt-5">
            <PageTitle title="Warehouse" />
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/warehouse'} className={"text-blue-600"}>
                            Warehouse
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Warehouse</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of products of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/receipt/add'}>
                            <Button className={"gap-2.5 !py-2 !border-none bg-blue-400 text-white hover:bg-blue-500"}>
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
                        <h5 className='font-[600]'>List products of warehouse</h5>
                        <span className='text-[12px] text-[#888]'>
                            List products of warehouse of your company
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
                        <option value="">--- Filter Product ---</option>
                        {warehouseFilter?.map((item, index) => (
                            <option key={index} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                    <div className="w-1/2">
                        <Search className={"!rounded-lg"} placeholder={"Enter product name..."}/>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow_table">
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
                                    category
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    supplier
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    cog
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    sp
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    stock
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    status
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    Time
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentWarehouse && currentWarehouse.length > 0 ?
                                currentWarehouse.map(item => (
                                    <tr key={item._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                        <td className="px-2 py-4 w-[15px]">
                                            <input type="checkbox" className='scale-120'/>
                                        </td>
                                        <td className="py-4 w-1/14 ">
                                            <div className="w-full flex justify-center">
                                                <img src={item.productId?.thumbnail_main} alt="ảnh sản phẩm" 
                                                className='w-[70px] h-[70px] rounded-[5px] border-custom'/>
                                            </div>
                                        </td>
                                        <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/14">
                                            <span className='line-clamp-2'>{item.productId?.name}</span>
                                        </th>
                                        <td className="px-4 py-4 w-2/18">
                                            {item.productId?.category.name}
                                        </td>
                                        <td className="px-4 py-4 w-2/18">
                                            {item.productId?.supplier.name}
                                        </td>
                                        <td className="px-4 py-4 w-2/18">
                                            {formatMony(item.productId?.cog)} đ
                                        </td>
                                        <td className="px-4 py-4 w-2/18">
                                            {formatMony(item.productId?.price)} đ
                                        </td>
                                        <td className="px-4 py-4 w-2/18">
                                            {item.stock}
                                        </td>
                                        <td className="px-4 py-4 w-2/18">
                                            <Button className={item.status === "còn hàng" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main capitalize" : "hidden"}>
                                                {item.status}
                                            </Button>
                                            <Button className={item.status === "hết hàng" ? "!border-red-500 !py-[2px] bg-red-200 text-red-600 capitalize" : "hidden"}>
                                                {item.status}
                                            </Button>
                                            <Button className={item.status === "sắp hết hàng" ? "!border-yellow-500 !py-[2px] bg-yellow-200 text-yellow-600 capitalize" : "hidden"}>
                                                {item.status}
                                            </Button>
                                        </td>
                                        <td className="py-4 w-2/12 text-center">
                                            <span className='time_text'>{item.formatDate}</span>
                                            <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                                <NavLink to={`/product//edit`}>
                                                    <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                        <MdAutoFixHigh className='text-[18px]'/>
                                                    </Button>
                                                </NavLink>
                                                <Button
                                                className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}>
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
                                        title={"No products in warehouse"}
                                        subTitle={"Please add products to the warehouse"}
                                    />
                                )}
                            
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent} />
                </div>
            </div>
        </div>
    );
}

export default Warehouse;
import  { Search, Button, PageBar, PageTitle, ModalToast, Empty } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions";
import { useEffect } from 'react';
import { useState } from 'react';

const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line} = icon;

const Product = () => {
    const dispatch = useDispatch();
    const { totalPage, products, categoryProduct } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getProducts());
        dispatch(actions.getCategoryProduct())
    }, [dispatch]);
    const format = (money) => money?.toLocaleString('vi-VN');
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastUserIndex = current * limit;
    const firstUserIndex = lastUserIndex - limit;

    const currentProduct = products.slice(firstUserIndex, lastUserIndex);
    const [isModal, setIsModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const handleDelete = () => {
        dispatch(actions.deleteProduct(deleteItem));
    }
    const [valueDate, setValueDate] = useState({
        startDate: null,
        endDate: null,
    })
    const onChangeDate = (e) => {
        setValueDate({
            ...valueDate,
            [e.target.name]: e.target.value,
        })
    }
    const handleSearch = (value) => {
        dispatch(actions.getProducts(value))
    }
    const handleChange = (e) => {
        const selectedItem = e.target.value;
        if(selectedItem){
            dispatch(actions.filterProduct("category", selectedItem))
        }else{
            dispatch(actions.getProducts());
        }
    }
    useEffect(() => {
        if(valueDate.startDate && valueDate.endDate){
            dispatch(actions.filterProduct("startDate", valueDate.startDate, "endDate", valueDate.endDate))
        }
    }, [dispatch, valueDate.startDate, valueDate.endDate])
    return (
        <div className="full pt-5">
            <PageTitle title="Product" />
            {isModal && <ModalToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleDelete}/>}
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/product'} className={"text-blue-600"}>
                            Product
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Product</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of products of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/product/add'}>
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
                        <h5 className='font-[600]'>List of products</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of products of your company
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-5 mt-5">
                    <div className="flex flex-col">
                        <input 
                            type="date"
                            onChange={onChangeDate} 
                            name="startDate"
                            className={`w-[250px] flex-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input 
                            type="date" 
                            onChange={onChangeDate}
                            name="endDate"
                            className={`w-[250px] flex-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <select 
                        className={`w-1/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                        aria-label="Default select example"
                        onChange={handleChange} 
                    >
                        <option value="">--- Filter Product ---</option>
                        {categoryProduct?.map((item, index) => (
                            <option key={index} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                    <div className="w-1/2">
                        <Search className={"!rounded-lg"} onSearch={handleSearch} placeholder={"Enter product name..."}/>
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
                                    name
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    price
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    stock
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    category
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    sale
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    unit
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 ? currentProduct?.map((item) => (
                                <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td className="py-4 w-1/14 ">
                                        <div className="w-full flex justify-center">
                                            <img src={item.thumbnail_main} alt="ảnh sản phẩm" 
                                            className='w-[70px] h-[70px] rounded-[5px] border-custom'/>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/14">
                                        <span className='line-clamp-2'>{item.name}</span>
                                    </th>
                                    <td className="px-4 py-4 w-2/17">
                                        ₫ {format(item.price)}
                                    </td>
                                    <td className="px-4 py-4 w-2/17">
                                        Quantity: {item.stock}
                                    </td>
                                    <td className="px-4 py-4 w-2/14">
                                        <Button className={item.category.name === "Linh kiện điện" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main capitalize" : "hidden"}>
                                            {item.category.name}
                                        </Button>
                                        <Button className={item.category.name === "COP/LOP" ? "!border-[#f74d4d8a] !py-[2px] bg-[#ff8585a6] text-[#c90c05] capitalize" : "hidden"}>
                                            {item.category.name}
                                        </Button>
                                        <Button className={item.category.name === "Linh kiện inox" ? "!border-blue-500 !py-[2px] bg-blue-200 text-blue-600 capitalize" : "hidden"}>
                                            {item.category.name}
                                        </Button>
                                        <Button className={item.category.name === "Tay vịn thang máy" ? "!py-[2px] !bg-yellow-200 text-yellow-600 !border-amber-500 capitalize" : "hidden"}>
                                            {item.category.name}
                                        </Button>
                                        <Button className={item.category.name === "Linh kiện thép" ? "!border-red-500 !py-[2px] !bg-red-200 !text-red-600 capitalize" : "hidden"}>
                                            {item.category.name}
                                        </Button>
                                    </td>
                                    <td className="px-4 py-4 w-2/14 text-justify">
                                        Giảm giá: {item.sale}%
                                    </td>
                                    <td className="px-4 py-4 w-2/14">
                                        đơn vị tính: {item.unit}
                                    </td>
                                    <td className="py-4 w-2/12 text-center">
                                        <span className='time_text'>{item.formatDate}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/product/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button onClick={() => {
                                                setDeleteItem(item._id);
                                                setIsModal(true);
                                            }}
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
                                    title={"No product found"} 
                                    subTitle={"Try adjusting your search or filter to find what you're looking for."}
                                />
                            )}
                        </tbody>
                    </table>
                    <PageBar 
                        currentPage={current} 
                        totalPage={totalPage} 
                        onPageChange={setCurrent}
                    />
                </div>
            </div>
        </div>
    )
}
export default Product
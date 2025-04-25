import  { Search, Button, PageBar, PageTitle, Empty } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions";
import { useEffect } from 'react';
import { useState } from 'react';

const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line} = icon;

const DiscountCategory = () => {
    const dispatch = useDispatch();
    const { totalPage, categoryDiscount } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getCategoryDiscount());
    }, []);
    const filterDiscount = [
        {id: 'active', text: 'Active'},
        {id: 'stop', text: 'Stop'},
    ]
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastUserIndex = current * limit;
    const firstUserIndex = lastUserIndex - limit;

    const currentDiscount = categoryDiscount.slice(firstUserIndex, lastUserIndex);

    const [valueDate, setValueDate] = useState({
        startDate: '',
        endDate: ''
    })
    const onChangeDate = (e) => {
        setValueDate({
            ...valueDate,
            [e.target.name]: e.target.value
        })
    }
    const handleSearch = (value) => {
        dispatch(actions.getCategoryDiscount(value))
    }

    const handleChange = (e) => {
        const valueSelected = e.target.value;
        if(valueSelected === "active"){
            dispatch(actions.filterDiscount("is_active", valueSelected))
        }else if(valueSelected === "stop"){
            dispatch(actions.filterDiscount("is_active", valueSelected))
        }else{
            dispatch(actions.getCategoryDiscount());
        }
    }
    useEffect(() => {
        if(valueDate.startDate && valueDate.endDate){
            dispatch(actions.filterDiscount("startDate", valueDate.startDate, "endDate", valueDate.endDate))
        }
    }, [valueDate.startDate, valueDate.endDate, dispatch])
    return (
        <div className="full py-5">
            <PageTitle title={"Category Discount"}/>
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/Discount'}>
                            Category
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/discount'} className={"text-blue-600"}>
                            Discount
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Discount</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of discount of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/category/discount/add'}>
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
                        <h5 className='font-medium'>List of discount</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of discount of your company
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
                        {filterDiscount?.map((item, index) => (
                            <option key={index} value={item.id}>{item.text}</option>
                        ))}
                    </select>
                    <div className="w-1/2">
                        <Search className={"!rounded-lg"} onSearch={handleSearch} placeholder={"Enter title discount..."}/>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-8">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    title
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    type
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    start
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    end
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    status
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    max use
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    used
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    last update
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryDiscount && categoryDiscount.length > 0 ? currentDiscount?.map((item) => (
                                <tr key={item._id} 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <th scope="row" className="px-4 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white w-2/13">
                                        <div className='line-clamp-2 w-full leading-10'>
                                            {item.title}
                                        </div>
                                    </th>
                                    <td className="px-4 py-4 w-3/19">
                                        <div className='w-full line-clamp-3 text-justify'>
                                            {item.discount_type}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 w-2/20">
                                        <div className='w-full line-clamp-3 text-justify'>
                                            {item.startDate}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 w-2/20">
                                        <div className='w-full line-clamp-3 text-justify'>
                                            {item.endDate}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 w-2/20">
                                        <Button className={item.is_active === "active" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main" : "hidden"}>
                                            {item.is_active}
                                        </Button>
                                        <Button className={item.is_active === "stop" ? "!border-red-500 !py-[2px] bg-red-200 text-red-600" : "hidden"}>
                                            {item.is_active}
                                        </Button>
                                        
                                    </td>
                                    <td className="px-4 py-4 w-1/18">
                                        <div className='w-full line-clamp-3 text-justify'>
                                            {item.use_limit}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 w-1/20">
                                        <div className='w-full line-clamp-3 text-justify'>
                                            {item.use_count}
                                        </div>
                                    </td>
                                    <td className="py-4 w-2/12 text-center">
                                        <span className='time_text'>{item.lastUpdate}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/category/discount/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <NavLink to={`/category/discount/${item._id}/delete`}>
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
                            )) : (
                                <Empty title={"No discount found"} subTitle={"Try adjusting your search or filter to find what you're looking for."}/>
                            )}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
        </div>
    )
}
export default DiscountCategory
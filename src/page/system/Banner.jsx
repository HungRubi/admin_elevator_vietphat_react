import  { Search, Button, PageBar, Empty } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions'

const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line} = icon;

const Banner = () => {
    const dispatch = useDispatch();
    const {categoryBanner, totalPage} = useSelector(state => state.app);
    
    useEffect(() => {
        dispatch(actions.getCategoryBanner())
    }, [])
    const filterBanner = [
        {id: "public", text: "Public"},
        {id: "hidden", text: "Hidden"},
    ]
    const [current, setCurrent] = useState(1);
    const limit = 7;
    const lastArticleIndex = current * limit;
    const firstArticleIndex = lastArticleIndex - limit;

    const currentArticle = categoryBanner.slice(firstArticleIndex, lastArticleIndex);

    const handleSearch = (value) => {
        dispatch(actions.getCategoryBanner(value))
    } 
    const [valueDate, setValueDate] = useState({
        startDate: '',
        endDate: ''
    })
    const onChangeDate = (e) => {
        setValueDate({
            ...valueDate,
            [e.target.value]: e.target.name
        })
    }
    const handleChange = (e) => {
        const newValue = e.target.value;
        if(newValue === "public") {
            dispatch(actions.filterBanner("status", newValue))
        }else if(newValue === "hidden") {
            dispatch(actions.filterBanner("status", newValue))
        }else{
            dispatch(actions.getCategoryBanner())
        }
    }
    useEffect(() => {
        if(valueDate.startDate && valueDate.endDate) {
            dispatch(actions.filterBanner("startDate", valueDate.startDate, "endDate", valueDate.endDate))
        }
    }, [dispatch, valueDate.startDate, valueDate.endDate])
    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/product'}>
                            Category
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/banner'} className={"text-blue-600"}>
                            Banner
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Banner</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of Banner of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/category/banner/add'}>
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
                        {filterBanner?.map((item, index) => (
                            <option key={index} value={item.id}>{item.text}</option>
                        ))}
                    </select>
                    <div className="w-1/2">
                        <Search className={"!rounded-lg"} onSearch={handleSearch} placeholder={"Enter title discount..."}/>
                    </div>
                </div>
                <div class="relative overflow-x-auto mt-8">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" class="py-3"></th>
                                <th scope="col" class="px-4 py-3">
                                    name
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    content
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    voucher
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" class="px-4 py-3 text-center">
                                    last update
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryBanner && categoryBanner.length > 0 ? currentArticle.map((item) => (
                                <tr key={item._id}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td class="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td class="py-4 w-2/15">
                                        <div className="w-full flex justify-center">
                                            <img src={item.thumbnail_1} alt={item.subject} 
                                            className='h-15 rounded-[5px] border-custom'/>
                                        </div>
                                    </td>
                                    <th scope="row" class="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/18 capitalize">
                                        <span className='line-clamp-1'>{item.name}</span>
                                    </th>
                                    <th scope="row" class="px-4 py-4 text-gray-900 dark:text-white w-3/10">
                                        <span className='font-[400] line-clamp-1 text-left'>{item.content}</span>
                                    </th>
                                    <th scope="row" class="px-4 py-4 text-gray-700 dark:text-white w-2/11">
                                        <span className='font-[400] line-clamp-1'>{item.discount?.title}</span>
                                    </th>
                                    <td class="px-6 py-4 w-1/13">
                                        <Button className={item.status === "public"? "capitalize !border-[#90d67f] !px-[25px] !py-[2px] bg-[#d9fbd0]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "hidden"? "capitalize !border-red-500 !px-[25px] !py-[2px] bg-red-200 !text-red-600" : "hidden"}>
                                            {item.status}
                                        </Button>
                                    </td>
                                    <td class="py-4 w-2/12 text-center">
                                        <span className='time_text'>{item.lastUpdate}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/category/banner/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}>
                                                <RiDeleteBin6Line className='text-[18px]'/>
                                            </Button>
                                            <NavLink>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <PiDotsThreeBold className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <Empty 
                                    title={"No banner found"}
                                    subTitle={"Try adjusting your search or filter to find what you're looking for."}
                                />
                            )}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
        </div>
    )
}
export default Banner
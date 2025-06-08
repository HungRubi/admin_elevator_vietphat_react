import  { Search, Button, PageBar, PageTitle, ModalToast, Empty } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions';

const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line} = icon;

const Article = () => {
    const dispatch = useDispatch();
    const {article} = useSelector(state => state.app);
    
    useEffect(() => {
        dispatch(actions.getArticle())
    }, [dispatch])
    const [current, setCurrent] = useState(1);
    const limit = 5;
    const lastArticleIndex = current * limit;
    const firstArticleIndex = lastArticleIndex - limit;

    const currentArticle = article?.slice(firstArticleIndex, lastArticleIndex);
    const filterArticle = [
        {id: 'public', text: 'Public'},
        {id: 'hidden', text: 'Hidden'}
    ]
    const handleSearch = (value) => {
        dispatch(actions.getArticle(value))
    }
    const handleChange = (e) => {
        const valueFilter = e.target.value;
        if(valueFilter === "public"){
            dispatch(actions.filterArticle("status", valueFilter))
        }else if(valueFilter === 'hidden'){
            dispatch(actions.filterArticle("status", valueFilter))
        }else{
            dispatch(actions.getArticle())
        }
    }
    const [valueDate, setValueDate] = useState({
        startDate: '',
        endDate: '',
    })
    const onChangeDate = (e) => {
        setValueDate({
            ...valueDate,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if(valueDate.startDate && valueDate.endDate){
            dispatch(actions.filterArticle("startDate", valueDate.startDate, "endDate", valueDate.endDate));
        }
    }, [valueDate.startDate, valueDate.endDate, dispatch])
    const [isModal, setIsModal] = useState(false);
    const [itemId, setItemId] = useState();
    const handleDelete = (id) => {
        dispatch(actions.deleteArticle(id))
    }
    return (
        <div className="full pt-5">
            <PageTitle title="Article" />
            {isModal && <ModalToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleDelete(itemId)}/>}
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/product'} className={"text-blue-600"}>
                            Article
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Article</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of article of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/article/add'}>
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
                        <h5 className='font-[600]'>List of articles</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of articles of your company
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-5">
                    <div className="flex flex-col">
                        <input 
                            type="date"
                            onChange={onChangeDate} 
                            name="startDate"
                            className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <input 
                            type="date" 
                            onChange={onChangeDate}
                            name="endDate"
                            className={`w-[250px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        />
                    </div>
                    <div className="w-1/3">
                        <select 
                            onChange={handleChange}
                            className={`w-full border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                            aria-label="Filter orders"
                        >
                            <option value="">--- Filter Orders ---</option>
                            {filterArticle.map((item, index) => (
                                <option key={index} value={item.id}>{item.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <Search 
                            className={"!rounded-lg"} 
                            placeholder="Enter order code..." 
                            onSearch={handleSearch}
                        />
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" className="py-3"></th>
                                <th scope="col" className="px-4 py-3">
                                    subject
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    author
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    content
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    last update
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {article && article.length > 0 ? currentArticle?.map((item) => (
                                <tr key={item._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td className="py-4 w-1/14 ">
                                        <div className="w-full flex justify-center">
                                            <img src={item.thumbnail_1 || item.thumbnail} alt={item.subject} 
                                            className='w-[70px] rounded-[5px] border-custom'/>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/12">
                                        <span className='line-clamp-2'>{item.subject}</span>
                                    </th>
                                    <td className="px-4 py-4 w-2/25 font-medium text-gray-900 dark:text-white">
                                        {item.author}
                                    </td>
                                    <td className="pl-4 pr-10 py-4 w-6/13 ">
                                        <div className="w-full line-clamp-3 text-justify">
                                            {item.content}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 w-2/23">
                                        <Button className={item.status === "public" ? "capitalize !border-[#90d67f] !py-[2px] bg-[#d9fbd0]" : "hidden"}>
                                            {item.status}
                                        </Button>
                                        <Button className={item.status === "hidden" ? "capitalize !py-[2px] bg-red-200 !border-red-500 text-red-600" : "hidden"}>
                                            {item.status}
                                        </Button>
                                    </td>
                                    <td className="py-4 text-center w-full px-4">
                                        <span className='time_text'>{item.formatDate}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-25 mx-auto">
                                            <NavLink to={`/article/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button onClick={() => {
                                                setIsModal(true);
                                                setItemId(item._id);
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
                                    title={"No article found"} 
                                    subTitle={"Try adjusting your search or filter to find what you're looking for."}
                                />
                            )}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={Math.ceil(article.length / limit)} onPageChange={setCurrent}/>
                </div>
            </div>
        </div>
    )
}
export default Article
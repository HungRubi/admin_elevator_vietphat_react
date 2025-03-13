import  { Search, Button, PageBar } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions'

const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line} = icon;

const Article = () => {
    const dispatch = useDispatch();
    const {article, totalPage} = useSelector(state => state.app);
    
    useEffect(() => {
        dispatch(actions.getArticle())
    }, [article])

    const [current, setCurrent] = useState(1);
    const limit = 7;
    const lastArticleIndex = current * limit;
    const firstArticleIndex = lastArticleIndex - limit;

    const currentArticle = article.slice(firstArticleIndex, lastArticleIndex);
    return (
        <div className="full pt-5">
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
                <div className="w-full flex items-center justify-between py-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>List of products</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of products of your company
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-1/2 gap-3">
                        <div className="w-1/2">
                            <Search className={"!rounded-[5px]"}/>
                        </div>
                        <Button>All reviews</Button>
                        <Button className={"!px-3"}>
                            <PiDotsThreeBold className='text-[20px]'/>
                        </Button>
                    </div>
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" class="py-3"></th>
                                <th scope="col" class="px-4 py-3">
                                    subject
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    author
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    content
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" class="py-3 text-center">
                                    last update
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentArticle.map((item) => (
                                <tr key={item._id}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td class="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td class="py-4 w-1/14 ">
                                        <div className="w-full flex justify-center">
                                            <img src={item.thumbnail} alt={item.subject} 
                                            className='w-[70px] rounded-[5px] border-custom'/>
                                        </div>
                                    </td>
                                    <th scope="row" class="px-4 py-4 font-medium text-gray-900 dark:text-white max-w-[300px] truncate">
                                        {item.subject}
                                    </th>
                                    <td class="px-4 py-4 w-2/17 font-medium text-gray-900 dark:text-white">
                                        {item.author}
                                    </td>
                                    <td class="px-4 py-4 w-6/12">
                                        <div className="w-full line-clamp-3 text-justify">
                                            {item.content}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 w-2/14">
                                        <Button className={"capitalize !border-[#90d67f] !py-[2px] bg-[#d9fbd0]"}>
                                            {item.status}
                                        </Button>
                                    </td>
                                    <td class="py-4 w-2/12 text-center">
                                        <span className='time_text'>{item.updatedAt}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/article/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <NavLink to={`/article/${item._id}/delete`}>
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
                            ))}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
        </div>
    )
}
export default Article
import  { Search, Button, PageBar, ModalToast, ToastFormat, Empty } from '../../components';
import icon from '../../util/icon';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions";
import { useEffect } from 'react';
import { useState } from 'react';

const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line } = icon;

const ProductCategory = () => {
    const dispatch = useDispatch();
    const { totalPage, categoryProduct, searchProduct, searchType } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getCategoryProduct());
    }, [dispatch]);
    const [searchTerm, setSearchTerm] = useState('');
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastUserIndex = current * limit;
    const firstUserIndex = lastUserIndex - limit;

    const currentProduct = (categoryProduct && categoryProduct.length > 0) 
    ? categoryProduct.slice(firstUserIndex, lastUserIndex) 
    : [];

    const [deleteId, setDeleteId] = useState(null);
    const [isModal, setIsModal] = useState(false);

    const handleDelete = async () => {
        try{
            dispatch(actions.deleteCategoryProduct(deleteId));
            dispatch(actions.getCategoryProduct());
            setIsModal(false);
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        dispatch(actions.getCategoryProduct(searchTerm)); 
    }, [dispatch, searchTerm]);
    const handleSearch = (term) => {
        setSearchTerm(term);
    };
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
                        <NavLink to={'/category/product'} className={"text-blue-600"}>
                            Product
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Category Product</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of category products of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/category/product/add'}>
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
                        <h5 className='font-medium'>List of category products</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of category products of your company
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-1/2 gap-3">
                        <div className="w-1/2">
                            <Search className={"!rounded-[5px]"} onSearch={handleSearch}/>
                        </div>
                        <Button>All category</Button>
                        <Button className={"!px-3"}>
                            <PiDotsThreeBold className='text-[20px]'/>
                        </Button>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Product name
                                </th>
                                
                                <th scope="col" className="px-4 py-3">
                                    description
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    last update
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchType ? searchProduct : currentProduct)?.length > 0 ?
                                (searchType ? searchProduct : currentProduct)?.map((item) => (
                                    <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                        <td className="px-2 py-4 w-[15px]">
                                            <input type="checkbox" className='scale-120'/>
                                        </td>
                                        <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-3/12">
                                            {item.name}
                                        </th>
                                        <td className="px-4 py-4 w-6/12">
                                            <div className='w-full line-clamp-3 text-justify'>
                                                {item.description}
                                            </div>
                                        </td>
                                        <td className="py-4 w-2/12 text-center">
                                            <span className='time_text'>{item.lastUpdate}</span>
                                            <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                                <NavLink to={`/category/product/${item._id}/edit`}>
                                                    <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                        <MdAutoFixHigh className='text-[18px]'/>
                                                    </Button>
                                                </NavLink>
                                                <Button 
                                                    onClick={() => {
                                                        setIsModal(true);
                                                        setDeleteId(item._id)
                                                    }} 
                                                    className="!py-2 !px-2 hover:bg-red-500 hover:text-white"
                                                >
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
                                )): 
                                (
                                    <Empty 
                                        title={"No categories found"}
                                        subTitle={"Try adjusting your search or filter to find what you're looking for."}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
            {isModal && <ModalToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleDelete} />}
        </div>
    )
}
export default ProductCategory
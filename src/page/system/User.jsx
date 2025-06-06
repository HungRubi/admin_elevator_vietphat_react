import { NavLink } from 'react-router-dom';
import  { CircleButton, Search, Button,PageBar, PageTitle, ModalToast, Empty } from '../../components';
import icon from '../../util/icon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as actions from "../../store/actions";
import { useState } from 'react';
const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, RiDeleteBin6Line, IoMdAdd } = icon;

const User = () => {
    const dispatch = useDispatch();
    const { user, totalPage } = useSelector(state => state.app);
    const handleChange = (e) => {
        const selected = e.target.value;
        if(selected === 'admin'){
            dispatch(actions.filterUser("authour", "admin"))
        }else if(selected === 'employee'){
            dispatch(actions.filterUser("authour", "employee"))
        }else if(selected === 'customer'){
            dispatch(actions.filterUser("authour", "employee"))
        }else{
            dispatch(actions.getUser())
        }
    }
    const handleSearch = (value) => {
        dispatch(actions.getUser(value));
    }
    useEffect(() => {
        dispatch(actions.getUser())
    }, [dispatch])
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastUserIndex = current * limit;
    const firstUserIndex = lastUserIndex - limit;

    const currentUser = user?.slice(firstUserIndex, lastUserIndex);
    const filterUser = [
        {id: "admin", text: "Admin"},
        {id: "employee", text: "Employee"},
        {id: "customer", text: "Customer"},
    ]
    const [valueDate, setValueDate] = useState({
        startDate: '',
        endDate: ''
    })
    const onChangeDate = (e) => {
        const newValueDate = {
            ...valueDate,
            [e.target.name]: e.target.value
        }
        setValueDate(newValueDate);
    }
    useEffect(() => {
        if(valueDate.startDate && valueDate.endDate){
            dispatch(actions.filterUser("start_date", valueDate.startDate, "end_date", valueDate.endDate));
        }
    }, [dispatch, valueDate])
    const [isModal, setIsModal] = useState(false);
    const [itemId, setItemId] = useState();
    const handleDelete = () => {
        dispatch(actions.deleteUser(itemId));
        dispatch(actions.getUser());
    }
    return (
        <div className="full pt-5">
            <PageTitle title="User" />
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/user'} className={"text-blue-600"}>
                            User
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">User</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of users of your website</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/user/add'}>
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
                        <h5 className='font-[600]'>List of users</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of users of your website
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
                        <option value="">--- Filter User ---</option>
                        {filterUser.map((item, index) => (
                            <option key={index} value={item.id}>{item.text}</option>
                        ))}
                    </select>
                    <div className="w-1/2">
                        <Search className={"!rounded-lg"} onSearch={handleSearch} placeholder={"Enter name user or account"}/>
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
                                    avatar
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    account
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    birth
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    phone
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    authorization 
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    last login
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {user && user.length > 0 ?  currentUser?.map((item) => (
                                <tr key={item._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td className="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td className="px-4 py-4 w-2/13">
                                        <div className="flex items-center gap-2.5">
                                            <CircleButton>
                                                <img 
                                                    src={
                                                    item?.avatar?.startsWith('/uploads')
                                                        ? `${import.meta.env.VITE_SERVER_URL}${item.avatar}`
                                                        : item.avatar
                                                    } 
                                                    alt="avatar" 
                                                    className='w-full object-cover rounded-[50%]'
                                                />
                                            </CircleButton>
                                            <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {item.name}
                                            </h5>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-2/17">
                                        {item.account}
                                    </th>
                                    <td className="px-4 py-4 w-2/17">
                                        {item.birthFormat}
                                    </td>
                                    <td className="px-4 py-4 w-2/17">
                                        {item.phone}
                                    </td>
                                    <td className="px-4 py-4 w-3/12 text-justify">
                                        {item.address}
                                    </td>
                                    <td className="px-6 py-4 w-2/17">
                                        <Button className={item.authour === "customer" ? "!border-[#90d67f] !py-[2px] bg-[#d9fbd0] text-main capitalize" : "hidden"}>
                                            {item.authour}
                                        </Button>
                                        <Button className={item.authour === "admin" ? "!border-[#f74d4d8a] !py-[2px] bg-[#ff8585a6] text-[#c90c05] capitalize" : "hidden"}>
                                            {item.authour}
                                        </Button>
                                        <Button className={item.authour === "employee" ? "!border-blue-500 !py-[2px] bg-blue-200 text-blue-600 capitalize whitespace-nowrap" : "hidden"}>
                                            {item.authour}
                                        </Button>
                                    </td>
                                    <td className="py-4 w-2/12 text-center">
                                    <span className='time_text'>{item.lastLoginFormat}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/user/${item._id}/edit`}>
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
                                            <NavLink>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <PiDotsThreeBold className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <Empty title={"No user found"} subTitle={"Try adjusting your search or filter to find what you're looking for."}/>
                            )}
                        </tbody>
                    </table>
                    <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
                </div>
            </div>
            {isModal && <ModalToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleDelete}/>}
        </div>
    )
}
export default User
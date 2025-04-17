import { NavLink } from 'react-router-dom';
import  { CircleButton, Search, Button,PageBar, PageTitle } from '../../components';
import icon from '../../util/icon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as actions from "../../store/actions";
import { useState } from 'react';
const { PiDotsThreeBold, MdChevronRight, MdAutoFixHigh, RiDeleteBin6Line, IoMdAdd } = icon;

const User = () => {
    const dispatch = useDispatch();
    const { user, totalPage } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getUser())
    }, [])
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastUserIndex = current * limit;
    const firstUserIndex = lastUserIndex - limit;

    const currentUser = user.slice(firstUserIndex, lastUserIndex);

    return (
        <div className="full py-5">
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
                <div className="w-full flex items-center justify-between py-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>List of users</h5>
                        <span className='text-[12px] text-[#888]'>
                            List of users of your website
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-1/2 gap-3">
                        <div className="w-1/2">
                            <Search className={"!rounded-[5px]"}/>
                        </div>
                        <Button>All user</Button>
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
                                <th scope="col" class="px-4 py-3">
                                    avatar
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    account
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    birth
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    phone
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    address
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    authorization 
                                </th>
                                <th scope="col" class="py-3 text-center">
                                    last login
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUser.map((item) => (
                                <tr key={item._id}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                    <td class="px-2 py-4 w-[15px]">
                                        <input type="checkbox" className='scale-120'/>
                                    </td>
                                    <td class="px-4 py-4 w-2/13">
                                        <div className="flex items-center gap-2.5">
                                            <CircleButton>
                                                <img src={item.avatar} alt="ảnh sản phẩm" 
                                                className='w-full object-cover rounded-[50%]'/>
                                            </CircleButton>
                                            <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {item.name}
                                            </h5>
                                        </div>
                                    </td>
                                    <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-2/17">
                                        {item.account}
                                    </th>
                                    <td class="px-4 py-4 w-2/17">
                                        {item.birthFormat}
                                    </td>
                                    <td class="px-4 py-4 w-2/17">
                                        {item.phone}
                                    </td>
                                    <td class="px-4 py-4 w-3/12 text-justify">
                                        {item.address}
                                    </td>
                                    <td class="px-6 py-4 w-2/17">
                                        {item.authour}
                                    </td>
                                    <td class="py-4 w-2/12 text-center">
                                    <span className='time_text'>{item.lastLoginFormat}</span>
                                        <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                            <NavLink to={`/user/${item._id}/edit`}>
                                                <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <NavLink to={`/user/${item._id}/delete`}>
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
export default User
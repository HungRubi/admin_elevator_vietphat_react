import { NavLink } from "react-router-dom";
import icons from '../../util/icon';
import { Button, Empty, PageTitle, Search, CircleButton, PageBar, ModalToast } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions'

const {MdChevronRight, IoMdAdd, MdAutoFixHigh, RiDeleteBin6Line, PiDotsThreeBold } = icons

const Notification = () => {
    const notificationFilter = [
        {
            id: "Thông báo hệ thống", 
            name: "Thông báo hệ thống"
        },
        {
            id: "Thông báo đơn hàng", 
            name: "Thông báo đơn hàng"
        },
        {
            id: "Thông báo khách hàng", 
            name: "Thông báo khách hàng"
        },
    ];
    const dispatch = useDispatch();
    const { notificaiton } = useSelector(state => state.app);

    useEffect(() => {
        dispatch(actions.getNotification())
    }, [dispatch]);

    const [current, setCurrent] = useState(1);

    const limit = 10;
    const lastItemIndex = current * limit;
    const firstItemIndex = lastItemIndex - limit;

    const currentNoti = notificaiton?.slice(firstItemIndex, lastItemIndex)
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const handleDelete = () => {
        dispatch(actions.deleteNotification(deleteId))
    }
    const [selected, setSelected] = useState("");
    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelected(newValue);
        if(newValue) {
            dispatch(actions.filterNotification("type", newValue))
        }else {
            dispatch(actions.getNotification())
        }
    }
    const [ valueDate, setValueDate ] = useState({
            startDate: '',
            endDate: ''
        })
    const onChangeDate = (e) => {
        setValueDate({
            ...valueDate,
            [e.target.name] : e.target.value,
        })
    }
    useEffect(() => {
        if (valueDate.startDate && valueDate.endDate) {
            dispatch(actions.filterNotification("startDate", valueDate.startDate, "endDate", valueDate.endDate));
        }else{
            dispatch(actions.getNotification())
        }
    }, [valueDate, dispatch]);
    return (
        <div>
            <div className="full pt-5">
                <ModalToast isOpen={isOpen} setIsOpen={setIsOpen} onDelete={handleDelete}/>
                <PageTitle title="Notification" />
                <div className="w-full px-[30px] flex gap-8">
                    <div className="w-full">
                        <div className="flex items-center gap-2 text-[15px] text-color">
                            <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                                Dashboard
                            </NavLink>
                            <MdChevronRight/>
                            <NavLink to={'category/notification'} className={"text-blue-600"}>
                                Notification
                            </NavLink>
                        </div>
                        <h2 className="text-[35px] font-[600]">Notification</h2>
                        <h5 className="text-[12px] text-[#6d6c6c]">List of notification of your website</h5>
                        <div className="flex mt-5">
                            <NavLink to={'/category/notification/add'}>
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
                            <h5 className='font-[600]'>Notification</h5>
                            <span className='text-[12px] text-[#888]'>
                                List notification of your company
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mt-5">
                        <div className="flex flex-col">
                            <input 
                                type="date"
                                name="startDate"
                                onChange={onChangeDate}
                                value={valueDate.startDate}
                                className={`w-[250px] flex-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                        </div>
                        <div className="flex flex-col">
                            <input 
                                type="date" 
                                name="endDate"
                                onChange={onChangeDate}
                                value={valueDate.endDate}
                                className={`w-[250px] flex-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                        </div>
                        <select 
                            className={`w-1/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                            aria-label="Default select example"
                            onChange={handleChange}
                            defaultValue={selected}
                        >
                            <option value="">--- Filter Notification ---</option>
                            {notificationFilter?.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                        <div className="w-1/2">
                            <Search className={"!rounded-lg"} placeholder={"Enter user name..."}/>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow_table">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        <input type="checkbox" className='scale-120'/>
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        user
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        type
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        message
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                       status
                                    </th>
                                    <th scope="col" className="py-3 text-center">
                                        time
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {notificaiton && notificaiton.length > 0 ? currentNoti.map(item => (
                                    <tr key={item._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                        <td className="px-2 py-4 w-[15px] min-h-[70px]">
                                            <input type="checkbox" className='scale-120'/>
                                        </td>
                                        <td className="px-4 py-4 w-2/13">
                                            <div className="flex items-center gap-2.5">
                                                {item.user_id ? (
                                                    <>
                                                        <CircleButton>
                                                            <img 
                                                                src={
                                                                    item?.user_id?.avatar?.startsWith('/uploads')
                                                                    ? `${import.meta.env.VITE_SERVER_URL}${item?.user_id?.avatar}`
                                                                    : item?.user_id?.avatar
                                                                } 
                                                                alt="ảnh sản phẩm" 
                                                                className='w-full object-cover rounded-[50%]'
                                                            />
                                                        </CircleButton>
                                                        <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                            {item.user_id?.name}
                                                        </h5>
                                                    </>
                                                ): (
                                                    <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                        Tất cả người dùng  
                                                    </h5>
                                                )}
                                            </div>
                                        </td> 
                                        <th scope="row" className="px-4 py-4 font-medium w-2/12 truncate">
                                            {item.type}
                                        </th>
                                        <td className="px-4 py-4 w-5/12">
                                            <span className="line-clamp-2">
                                                {item.message}
                                            </span>
                                        </td>
                                                                           
                                        <td className="px-4 py-4 w-2/14">
                                            {(item.isRead === true || item.isRead === false) && (
                                                <Button
                                                    className={`!py-[2px] capitalize ${
                                                    item.isRead
                                                        ? "!border-blue-500 !bg-blue-200 text-blue-600"
                                                        : "!border-red-500 bg-red-200 text-red-600"
                                                    }`}
                                                >
                                                    {item.isRead ? "Read" : "Unread"}
                                                </Button>
                                            )}
                                        </td>
                                        <td className="py-4 text-center">
                                            <span className='time_text'>{item.lastUpdate}</span>
                                            <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                                <NavLink to={`/category/notification/${item._id}/edit`}>
                                                    <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                        <MdAutoFixHigh className='text-[18px]'/>
                                                    </Button>
                                                </NavLink>
                                                <Button onClick={() => {
                                                    setIsOpen(true);
                                                    setDeleteId(item._id);
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
                                        title={"No notification"}
                                        subTitle={"There are no announcements on your website."}
                                    />
                                )}
                            </tbody>
                        </table>
                        <PageBar currentPage={current} totalPage={Math.ceil(notificaiton.length / limit)} onPageChange={setCurrent}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Notification
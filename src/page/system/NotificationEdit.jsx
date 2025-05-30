import icons from '../../util/icon';
import { InputGroup, Button, Combobox, Textearea } from '../../components';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const {MdChevronRight, MdCall, MdOutlineMail, FaMapMarkerAlt, RiMessage3Line } = icons

const NotificationEdit = () => {
    const dispatch = useDispatch();
    const { message, notificaitonDetails } = useSelector(state => state.app)
    const {id} = useParams();
    useEffect(() => {
        dispatch(actions.editNotification(id))
    }, [dispatch, id])
    const typeNotifi = [
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
    ]
    const [formData, setFormData] = useState({
        type: "",
        message: "",
        user_id: "",
    })
    useEffect(() => {
        if(notificaitonDetails){
            setFormData({
                type: notificaitonDetails?.type || "",
                message: notificaitonDetails?.message || "",
                user_id: notificaitonDetails?.user_id || "",
            })
        }
    }, [notificaitonDetails])
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.addNotification(formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Thêm thông báo thành công"){
            navigate("/category/notification")
        }
    }, [navigate, message])
    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/notification'} className={"text-blue-600"}>
                            Notification    
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/notification/:id/edit'} className={"text-blue-600"}>
                            Edit notification
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Notification</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Edit a notification of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-[48.5px]">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            System Notification
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Create system notification for your website
                        </p>
                    </div>
                    <div className="flex-1">
                        <Combobox 
                            data={typeNotifi}
                            label={"Type Notification"}
                            name={"type"}
                            onChange={handleChange}
                            selected={formData.type}
                        />
                        <Textearea 
                            label={"Message"} 
                            name={"message"}
                            onChange={handleChange}
                            children={formData.message}
                            row={10}
                        />
                        {formData.type === "Thông báo đơn hàng" ? (
                            <InputGroup 
                                label={"User"} 
                                name={"user_id"}
                                icon={<MdOutlineMail className="text-lg text-gray-600"/>}
                                onChange={handleChange}
                                value={formData.user_id}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/user"}>
                            Cancel
                        </NavLink>
                    </Button>
                    <Button type="submit" className={"absolute left-[77.777%] transform -translate-x-[100%] top-[50%] -translate-y-[50%] shadow-md !py-1 font-medium text-white bg-blue-500"}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default NotificationEdit
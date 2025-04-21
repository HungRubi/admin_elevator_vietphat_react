import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button } from '../../components'
import icon from '../../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'

const { MdChevronRight } = icon

const UserAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = useSelector(state => state.app)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        birth: '',
        account: '',
        avatar: '',
        password: '',
        cofirm_password: '',
        authour: '',
    })
    const authour = [
        {
            id: 'admin',
            text: 'Admin',
        },
        {
            id: 'employee',
            text: 'Employee',
        },
        {
            id: 'customer',
            text: 'Customer',
        },
    ]
    const hanleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem.id : e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.createUser(formData));
    }
    useEffect(() => {
        if(message === 'Thêm user thành công'){
            navigate("/user")
        }
    }, [message, navigate])
    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/user'}>
                            User
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/user/add'} className={"text-blue-600"}>
                            Add user
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">User</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new user of your company</h5>
                </div>
                
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Profile
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Fullname"} 
                            name={"name"}
                            onChange={hanleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Email"} 
                            type={"email"} 
                            name={"email"}
                            onChange={hanleChange}
                            value={formData.email}
                        />
                        {message === 'Email đã được đăng ký rồi' && (
                            <span className="block mt-1 text-sm text-red-500">
                                {message}
                            </span>
                        )}
                        <Input 
                            label={"Phone"} 
                            type={"phone"} 
                            name={"phone"}
                            onChange={hanleChange}
                            value={formData.phone}
                        />
                        <Input 
                            label={"Address"} 
                            type={"address"} 
                            name={"address"}
                            onChange={hanleChange}
                            value={formData.address}
                        />
                        <Input 
                            label={"Birth"} 
                            type={"date"} 
                            name={"birth"}
                            onChange={hanleChange}
                            value={formData.birth}
                        />
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Account
                        </h5>
                        
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Create an account to log in to the system and use the functions.
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Account"} 
                            name={"account"}
                            onChange={hanleChange}
                            value={formData.account}
                            required
                        />
                        {message === 'Tài khoản đã được đăng ký rồi' && (
                            <span className="block mt-1 text-sm text-red-500">
                                {message}
                            </span>
                        )}
                        <Input 
                            label={"Avatar"} 
                            name={"avatar"} 
                            placeholder={"Url image"}
                            onChange={hanleChange}
                            value={formData.avatar}
                        />
                        <Input 
                            label={"Password"} 
                            name={"password"} 
                            type={"password"}
                            onChange={hanleChange}
                            value={formData.password}
                        />
                        <Input 
                            label={"Comfirm Password"} 
                            type={"password"} 
                            name={"cofirm_password"}
                            onChange={hanleChange}
                            value={formData.cofirm_password}
                        />
                        {message === 'Mật khẩu không trùng nhau' && (
                            <span className="block mt-1 text-sm text-red-500">
                                {message}
                            </span>
                        )}
                        <Combobox 
                            data={authour} 
                            label={"Authour"} 
                            name={"authour"}
                            onChange={hanleChange}
                            selected={formData.authour}
                        />
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

export default UserAdd
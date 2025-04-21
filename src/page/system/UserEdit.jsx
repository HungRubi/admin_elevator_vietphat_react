import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions';

const { MdChevronRight } = icon

const UserEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { detailUser } = useSelector(state => state.app);
    const id = window.location.pathname.split('/').slice(-2, -1)[0];

    useEffect(() => {
        dispatch(actions.getUserDetail(id))
    }, [dispatch, id])
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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        birth: '',
        account: '',
        avatar: '',
        password: '',
        authour: '',
    })
    useEffect(() => {
        if(detailUser){
            setFormData({
                name: detailUser?.name,
                email: detailUser?.email,
                phone: detailUser?.phone,
                address: detailUser?.address,
                birth: detailUser?.birthFormated,
                account: detailUser?.account,
                avatar: detailUser?.avatar,
                password: detailUser?.password,
                authour: detailUser?.authour,
            })
        }
    }, [detailUser])
    const hanleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateUser(id, formData));
        navigate("/user");
    }
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
                        <NavLink to={'/user/:id'} className={"text-blue-600"}>
                            Edit user
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">User</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Edit user of your company</h5>
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
                            type={"text"}
                            name={"name"} 
                            value={formData?.name}
                            onChange={hanleChange}
                        />
                        <Input 
                            label={"Email"} 
                            type={"email"} 
                            name={"email"}  
                            onChange={hanleChange}
                            value={formData?.email}
                        />
                        <Input 
                            label={"Phone"} 
                            type={"phone"} 
                            name={"phone"} 
                            value={formData?.phone}
                            onChange={hanleChange}
                        />
                        <Input 
                            label={"Address"} 
                            type={"address"} 
                            name={"address"} 
                            onChange={hanleChange}
                            value={formData?.address}
                        />
                        <Input 
                            label={"Birth"} 
                            type={"date"} 
                            name={"birth"} 
                            onChange={hanleChange}
                            value={formData?.birth}
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
                            value={formData?.account}
                        />
                        <Input 
                            label={"Avatar"} 
                            placeholder={"Url image"} 
                            onChange={hanleChange}
                            value={formData?.avatar}
                        />
                        <Input 
                            label={"Password"} 
                            type={"password"} 
                            onChange={hanleChange}
                            value={formData?.password}
                        />
                        <Combobox 
                            data={authour} 
                            label={"Authour"} 
                            onChange={hanleChange}
                            selected={formData?.authour} 
                            name={"authour"}
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

export default UserEdit
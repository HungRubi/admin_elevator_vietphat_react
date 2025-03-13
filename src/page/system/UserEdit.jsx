import { NavLink } from "react-router-dom";
import { Input, Combobox, Button } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions'

const { MdChevronRight } = icon

const UserEdit = () => {
    const dispatch = useDispatch();
    const { detailUser } = useSelector(state => state.app);
    console.log(detailUser?.name);
    const id = window.location.pathname.split('/').slice(-2, -1)[0];

    useEffect(() => {
        dispatch(actions.getUserDetail(id))
    }, [])
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
            <form className="w-full px-[30px] bg-white mt-8" method="POST">
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
                        <Input label={"Fullname"} name={"name"} value={detailUser?.name}/>
                        <Input label={"Email"} type={"email"} name={"email"}  value={detailUser?.email}/>
                        <Input label={"Phone"} type={"phone"} name={"phone"} value={detailUser?.phone}/>
                        <Input label={"Address"} type={"address"} name={"address"} value={detailUser?.address}/>
                        <Input label={"Birth"} type={"date"} name={"birth"} value={detailUser?.birthFormated}/>
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
                        <Input label={"Account"} name={"account"} value={detailUser?.account}/>
                        <Input label={"Avatar"} placeholder={"Url image"} value={detailUser?.avatar}/>
                        <Input label={"Password"} type={"password"} value={detailUser?.password}/>
                        <Combobox data={authour} label={"Authour"} selected={detailUser?.authour} name={"authour"}/>
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
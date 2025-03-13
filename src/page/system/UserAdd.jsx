import { NavLink } from "react-router-dom";
import { Input, Combobox, Button } from '../../components'
import icon from '../../util/icon';

const { MdChevronRight } = icon

const UserAdd = () => {
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
                        <NavLink to={'/user/add'} className={"text-blue-600"}>
                            Add user
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">User</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new user of your company</h5>
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
                        <Input label={"Fullname"} name={"name"}/>
                        <Input label={"Email"} type={"email"} name={"email"}/>
                        <Input label={"Phone"} type={"phone"} name={"phone"}/>
                        <Input label={"Address"} type={"address"} name={"address"}/>
                        <Input label={"Birth"} type={"date"} name={"birth"}/>
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
                        <Input label={"Account"} name={"account"}/>
                        <Input label={"Avatar"} name={"avatar"} placeholder={"Url image"}/>
                        <Input label={"Password"} name={"password"} type={"password"}/>
                        <Input label={"Comfirm Password"} type={"password"} name={"cofirm_password"}/>
                        <Combobox data={authour} label={"Authour"} name={"author"}/>
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
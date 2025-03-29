import { NavLink } from "react-router-dom"
import icons from '../../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const {FcGoogle, FaFacebook} = icons;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message, loginError } = useSelector(state => state.app);
    const [formData, setFormData] = useState({
        account: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.login(formData))
    }
    
    useEffect(() => {
        if(message){
            toast.success(message);
            navigate("/");
        }
    }, [message, navigate])
    
    return (
        <div className="fixed w-full bg-[#f3f3f3] top-0 z-[9999999999999999999999999999999999999999999999999999999] h-screen overflow-y-hidden">
            <div className="w-full h-1/7 flex items-center justify-between px-[10%]">
                <div className="flex items-center">
                    <NavLink to={"/"}>
                        <img src="/img/default/logo.png" alt="" className="h-[150px] w-auto mb-4"/>
                    </NavLink>
                    <h1 className="text-[35px] font-[500] cursor-default text-[#2f904b]">Đăng nhập</h1>
                </div>
                <NavLink
                className="text-[18px] text-[#2f904b]">
                    Bạn cần giúp đỡ?
                </NavLink>
            </div>
            <div className="w-full relative mb-8">
                <img src="/img/default/background_login.png" alt="" className=""/>
                <form className="w-[500px] bg-white rounded-[4px] login_form absolute"
                onSubmit={handleSubmit}>
                    <div className="px-[30px] py-[1.375rem] w-full">
                        <div className="text-[1.8rem] text-center capitalize text-[#2f904b]">
                            đăng nhập
                        </div>
                    </div>
                    <div className="px-[30px] pb-[30px]">
                        <div className="mt-5">
                            <input type="text" placeholder="Nhập tài khoản của bạn" name="account"
                            onChange={handleChange} 
                            className="flex-1 outline-none px-[0.75rem] py-[0.75rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-full" />
                        </div>
                        <div className="mt-8">
                            <input type="password" placeholder="Mật khẩu" name="password"
                            onChange={handleChange}
                            className="flex-1 outline-none px-[0.75rem] py-[0.75rem] border border-[rgba(0,0,0,.14)] rounded-[2px] h-[2.5rem] w-full" />
                        </div>
                        <div className="mt-4">
                            <p className="text-red-600 text-sm">
                                {loginError ? "Tài khoản mật khẩu không chính xác" : ""}
                            </p>
                        </div>
                        <div className={`${loginError ? "mt-4" : "mt-8"}`}>
                            <button type="submit"
                            className="flex-1 outline-none px-[0.75rem] py-[0.75rem] leading-1 cursor-progress uppercase border-none bg-[#2f904b] rounded-[2px] h-[2.5rem] w-full text-white opacity-70">
                                Đăng nhập
                            </button>
                        </div>
                        <div className="w-full mt-2">
                            <NavLink className="text-blue-600 text-[12px]">
                                Quên mật khẩu
                            </NavLink>
                        </div>
                        <div className="w-full flex items-center">
                            <div className="w-full flex-1 h-[1px] bg-[#dbdbdb]"></div>
                            <div className="text-[#ccc] px-4 text-[0.75rem] uppercase">hoặc</div>
                            <div className="w-full flex-1 h-[1px] bg-[#dbdbdb]"></div>
                        </div>
                        <div className="flex items-center gap-5 mt-5">
                            <button className="text-[18px] w-full border border-[rgba(0,0,0,.26)] rounded-[2px] text-[rgba(0,0,0,.87)] flex items-center justify-center gap-2.5 py-[0.55rem] cursor-pointer">
                                <FaFacebook className="text-[25px] text-blue-600" type="button"/>
                                Facebook
                            </button>
                            <button className="text-[18px] w-full border border-[rgba(0,0,0,.26)] rounded-[2px] text-[rgba(0,0,0,.87)] flex items-center justify-center gap-2.5 py-[0.55rem] cursor-pointer">
                                <FcGoogle className="text-[25px]" type="button"/>
                                Google
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
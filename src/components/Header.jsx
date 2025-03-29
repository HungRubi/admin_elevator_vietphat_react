import {CircleButton, Search } from './index'
import icon from '../util/icon'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const { IoSunnyOutline, FaRegBell, FaArrowRightFromBracket, BsPerson, IoSettingsOutline} = icon;

const Header = () => {
    const { currentUser } = useSelector(state => state.app);
    const [openMenu, setOpenMenu] = useState(null);
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest(".btn_togglo, .menu_togglo")) {
            setOpenMenu(null);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
    return (
        <header className="w-full flex justify-between items-center h-full">
            <div className="w-[240px] flex items-center">
                <NavLink to={"/"}>
                    <img src="/img/default/logo.png" alt="logo"
                    className='w-[70px]'/>
                </NavLink>
                <h1 className='text-[35px] text-main'>
                    Việt Phát
                </h1>
            </div>
            <div className="w-1/2 max-w-[550px] ">
                <Search/>
            </div>
            <div className="mr-[30px] flex items-center gap-4">
                <CircleButton className="!bg-[rgba(255,204,133,0.24)]">
                    <IoSunnyOutline className='text-[20px] text-[#e5780b]'/>
                </CircleButton>
                <CircleButton>
                    <FaRegBell className='text-[20px] text-gray-500'/>
                </CircleButton>
                <CircleButton className={"relative btn_togglo"} onClick={() => toggleMenu("account")}>
                    <img src="/img/default/default.png" alt="avatar"
                    className='w-full object-center rounded-[50%]'/>
                    {openMenu === "account" && (
                        <div className="absolute bg-white w-[250px] top-[140%] right-0 rounded-[3px] menu pb-2.5 menu_togglo ">
                            <div className="flex flex-col items-center pt-[15px] justify-center">
                                <img src="/img/default/default.png" alt="" className='w-[40px] h-[40px] rounded-[50%] '/>
                                <h5 className="text-[15px] mt-2.5">
                                    Nguyễn Huy Hùng
                                </h5>
                                <hr className='h-[1px] border-t border-t-[#cbd0dd] w-full my-3'/>
                            </div>
                            <div className="flex items-center justify-center flex-col gap-2.5 pb-2.5">
                                <ul className='w-full'>
                                    <li className="px-[1rem] py-[0.5rem] flex gap-2.5 items-center hover_bg_li">
                                        <BsPerson className='text-lg text-gray-600'/>
                                        <NavLink className="capitalize text-[15px] text-gray-600"
                                        to={"/account/profile"}>
                                            tài khoản
                                        </NavLink>
                                    </li>
                                    <li className="px-[1rem] py-[0.5rem] flex gap-2.5 items-center hover_bg_li">
                                        <FaRegBell className='text-base text-gray-500'/>
                                        <NavLink className="capitalize text-[15px] text-gray-600"
                                        to={"/account/order"}>
                                            thông báo
                                        </NavLink>
                                    </li>
                                    <li className="px-[1rem] py-[0.5rem] flex gap-2.5 items-center hover_bg_li">
                                        <IoSettingsOutline className='text-gray-600'/>
                                        <NavLink className="capitalize text-[15px] text-gray-600"
                                        to={"/account/voucher"}>
                                            setting
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className="px-[1rem] w-full">
                                    <button className="text-base cursor-pointer bg-[rgba(121,119,119,0.1215686275)] w-full py-1.5 rounded-[8px] !text-black border border-[#cbd0dd]">
                                        <NavLink
                                        to={"/login"}
                                        className="flex items-center justify-center gap-2.5">
                                            <FaArrowRightFromBracket className='text-base'/>
                                            Sign out
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </CircleButton>
            </div>
        </header>   
    );
};

export default Header;
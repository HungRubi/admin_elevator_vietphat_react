import {CircleButton, Search } from './index'
import icon from '../util/icon'
import { NavLink } from 'react-router-dom';

const { IoSunnyOutline, FaRegBell} = icon;

const Header = () => {
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
                    <FaRegBell className='text-[20px] text-color'/>
                </CircleButton>
                <CircleButton>
                    <img src="/img/default/default.png" alt="avatar"
                    className='w-full object-center rounded-[50%]'/>
                </CircleButton>
            </div>
        </header>   
    );
};

export default Header;
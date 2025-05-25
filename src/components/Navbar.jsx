import { NavLink } from "react-router-dom";
import {menu} from '../util/menu';
import icon from '../util/icon';
import { useEffect, useState } from "react";
const { BsArrowBarLeft } = icon
const active = 'w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] capitalize cursor-pointer rounded-[8px] bg-[#eff2f6]';
const notActive = 'w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] capitalize cursor-pointer hover:bg-[#eff2f6] transition-all ease-linear duration-300 rounded-[8px]';
const Navbar = () => {
    const [display, setDisplay] = useState("hidden");
    const handleClickOutside = (event) => {
        if (!document.querySelector(".menuNav")?.contains(event.target)) {
            setDisplay("hidden");
        }
    };
    const handleDisplay = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
        setDisplay((prev) => (prev === "hidden" ? "block" : "hidden"));
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <nav className="w-full h-full border-r-custom">
            <ul className="w-full relative overflow-auto h-[calc(100%-70px)]
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#74717171]
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                {menu.map((item, index) => (
                    <li key={index} className="px-[15px] my-[5px] w-full relative">
                        <NavLink 
                        to={item.path}
                        className={({isActive}) => isActive ? active : notActive }>
                            <div className="flex items-center gap-2.5">
                                {item.icon}
                                <span className=" leading-8">{item.text}</span>
                            </div>
                        </NavLink>
                        <span onClick={handleDisplay} className=" absolute cursor-pointer top-[50%] right-3 transform translate-y-[-50%] w-10 h-10 flex items-center justify-center">{item.icon2}</span>
                        {item.Children && item.Children.length ? (
                            <ul className={`absolute left-[25px] right-0 menuNav ${display}`}>
                                {item.Children.map(chil => (
                                    <li key={chil.text} className="px-[15px] my-[5px] w-full">
                                    <NavLink 
                                        to={chil.path}
                                        className={({isActive}) => isActive ? active : notActive }>
                                            <div className="flex items-center gap-2.5">
                                                {chil.icon}
                                                <span className=" leading-8">{chil.text}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ): (
                            ""
                        )}
                    </li>
                ))}
                
            </ul>
            <div className="absolute bottom-0 w-full border-t-custom h-[70px] flex items-center pl-[25px] text-color text-[20px] gap-2.5 cursor-pointer">
                <BsArrowBarLeft/>
                <h5 className="text-[17px]">Collapsed View</h5>
            </div>
        </nav>
    );
};

export default Navbar;
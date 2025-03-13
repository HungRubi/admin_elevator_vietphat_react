import { NavLink } from "react-router-dom";
import {menu} from '../util/menu';
import icon from '../util/icon';
import { useState } from "react";
const { BsArrowBarLeft } = icon
const active = 'w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] capitalize cursor-pointer rounded-[8px] bg-[#eff2f6]';
const notActive = 'w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] capitalize cursor-pointer hover:bg-[#eff2f6] transition-all ease-linear duration-300 rounded-[8px]';
const Navbar = () => {
    const [display, setDisplay] = useState("hidden");
    function handleDisplay () {
        setDisplay(pre => (pre === "hidden" ? "block" : "hidden"))
    }
    return (
        <nav className="w-full h-full border-r-custom relative overflow-hidden">
            <ul className="w-full">
                {menu.map((item, index) => (
                    <li key={index} className="px-[15px] my-[5px] w-full relative">
                        <NavLink 
                        to={item.path}
                        className={({isActive}) => isActive ? active : notActive }>
                            <div className="flex items-center gap-2.5">
                                {item.icon}
                                <span className=" leading-8">{item.text}</span>
                            </div>
                            <span onClick={handleDisplay}>{item.icon2}</span>
                        </NavLink>
                        {item.Children && item.Children.length ? (
                            <ul className={`absolute left-[25px] right-0 ${display}`}>
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
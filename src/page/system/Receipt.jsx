import { NavLink } from "react-router-dom";
import icons from '../../util/icon';
import { Button } from "../../components";
const { MdChevronRight, IoMdAdd } = icons

const Receipt  = () => {
    return (
        <div className="w-full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/supplier'} className={"text-blue-600"}>
                            Supplier
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Supplier</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">List of suppliers cooperating with my company</h5>
                    <div className="flex mt-5">
                        <NavLink to={'/category/supplier/add'}>
                            <Button className={"gap-2.5 !py-1.5 !border-none bg-blue-400 text-white hover:bg-blue-500"}>
                                <IoMdAdd/>
                                Add
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Receipt;
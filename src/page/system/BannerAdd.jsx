import { NavLink } from "react-router-dom";
import { Input, Button, Textearea, InputGroup, Combobox } from '../../components'
import icon from '../../util/icon';

const { MdChevronRight, IoImageOutline } = icon

const BannerAdd = () => {
    const data = [
        {
            id: 'public',
            text: 'Public'
        },
        {
            id: 'hidden',
            text: 'Hidden'
        }
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
                        <NavLink to={'/category/product'}>
                            Category banner
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/product/add'} className={"text-blue-600"}>
                            Add banner
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Category Banner</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new banner of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" method="POST">
                <div className="w-full flex border-b-custom py-20">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Banner Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Details about the banner, including its content and design.
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input label={"Name"} name={"name"}/>
                        <InputGroup label={"Name"} name={"name"}
                        icon={<IoImageOutline className="text-lg text-gray-600"/>}
                        helper={"Please enter the thumbnail url link"}
                        pattern={"^https?:\\/\\/[a-zA-Z0-9\\-._~:/?#[\\]@!$&'()*+,;=]+$"}/>
                        <Combobox data={data} label={"Status"}/>
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

export default BannerAdd
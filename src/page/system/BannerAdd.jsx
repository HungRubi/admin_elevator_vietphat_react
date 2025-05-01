import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button, Textearea, InputGroup, Combobox } from '../../components'
import icon from '../../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'

const { MdChevronRight, IoImageOutline } = icon

const BannerAdd = () => {
    const { categoryDiscount, message } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getCategoryDiscount());
    }, []);
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
    const [formData, setFormData] = useState({
        name: '',
        thumbnail: '',
        thumbnail_1: '',
        content: '',
        status: '',
        discount: '',
    })
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id || selected._id : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.createBanner(formData))
    }
    const navigate = useNavigate()
    useEffect(() => {
        if(message === "Thêm banner thành công!"){
            navigate("/category/banner")
        }
    }, [message, navigate])
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
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
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
                        <Input 
                            label={"Name"} 
                            name={"name"} 
                            value={formData?.name}
                            onChange={handleChange}
                        />
                        <Textearea 
                            name={"content"} 
                            label={"Content"}
                            row={10}
                            children={formData?.content}
                            onChange={handleChange}
                        />
                        <Combobox 
                            data={data} 
                            name={"status"}
                            label={"Status"} 
                            onChange={handleChange}
                            selected={formData?.status}
                        />
                        <Combobox 
                            data={categoryDiscount} 
                            onChange={handleChange}
                            label={"Voucher"} 
                            name={"discount"}
                            selected={formData?.discount}
                        />
                    </div>  
                </div>
                <div className="w-full flex border-b-custom py-20">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Banner Thumbnail
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Details about the banner, including its content and design.
                        </p>
                    </div>
                    <div className="flex-1">
                        <InputGroup 
                            label={"Thumbnail"} 
                            onChange={handleChange}
                            name={"thumbnail"}
                            value={formData?.thumbnail}
                            icon={<IoImageOutline className="text-lg text-gray-600"/>}
                            helper={"Please enter the thumbnail url link"}
                        />
                        <InputGroup 
                            label={"Thumbnail"} 
                            onChange={handleChange}
                            name={"thumbnail_1"}
                            value={formData?.thumbnail_1}
                            icon={<IoImageOutline className="text-lg text-gray-600"/>}
                            helper={"Please enter the thumbnail url link"}
                        />
                    </div>  
                </div>
                <div className="w-full py-[83px] relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/category/banner"}>
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
import { NavLink } from "react-router-dom";
import { Input, Button, Textearea } from '../../components'
import icon from '../../util/icon';
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../store/actions'
const { MdChevronRight } = icon

const ProductCategoryAdd = () => {
    const dispatch = useDispatch();
    const [formData, setFormDate] = useState({
        name: "",
        description: ""
    })
    const handleChange = (e) => {
        setFormDate({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.createCategoryProduct(formData));
    }
    
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
                            Category product
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/product/add'} className={"text-blue-600"}>
                            Add category
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Category Product</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new Category Product of your company</h5>
                </div>
            </div>
            <form  className="w-full px-[30px] bg-white mt-8" method="POST" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-20">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Overview
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Your product category information
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input label={"Name"} name={"name"} 
                        onChange={handleChange} value={formData.name}/>
                        <Textearea row={5} label={"Description"} name={"description"} 
                        onChange={handleChange} children={formData.description}/>
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

export default ProductCategoryAdd
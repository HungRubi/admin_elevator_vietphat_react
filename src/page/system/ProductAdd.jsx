import { NavLink } from "react-router-dom";
import { Input, Combobox, Button, Textearea, InputGroup } from '../../components'
import icon from '../../util/icon';

const { MdChevronRight, MdOutlineDiscount, AiOutlineDollarCircle, MdNumbers } = icon

const ProductAdd = () => {
    const unit = [
        {
            id: 'Meter(m)',
            text: 'Meter(m)',
        },
        {
            id: 'Kilogam(kg',
            text: 'Kilogam(kg)',
        },
        {
            id: 'Piece(pcs)',
            text: 'Piece(pcs)',
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
                        <NavLink to={'/product'}>
                            Product
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/product/add'} className={"text-blue-600"}>
                            Add product
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Product</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new product of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" method="POST">
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Name & Description
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Product Overview
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input label={"Fullname"} name={"name"}/>
                        <Textearea label={"Description"} row={5} name={"description"}/>
                        <InputGroup type={"number"} label={"Discount"} 
                        icon={<MdOutlineDiscount className="text-[18px] text-gray-600"/>} 
                        name={"sale"} placeholder={"0% to 100%"}
                        helper={"Please enter number from 0 to 100"}/>
                        <InputGroup type={"number"} label={"Price"}
                        helper={"Please enter a numer greater than 0"}
                        placeholder={"> 0"} 
                        icon={<AiOutlineDollarCircle className="text-[18px] text-gray-600"/>} name="price"/>
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Manage Stock
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Product inventory information
                        </p>
                    </div>
                    <div className="flex-1">
                        <Combobox data={unit} label={"Unit"} name={"unit"} selected={"--- Choise ---"}/>
                        <Combobox data={unit} label={"Category"} name={"category"} selected={"--- Choise ---"}/>
                        <InputGroup type={"number"} label={"Quantity Of Stock"} 
                        icon={<MdNumbers className="text-[18px] text-gray-500"/>} 
                        name="stock" helper={"Please enter a numer greater than 0"}
                        placeholder={"> 0"}/>
                        <InputGroup type={"number"} label={"Minimum Of Stock"} 
                        icon={<MdNumbers className="text-[18px] text-gray-500"/>} 
                        name="minimum" helper={"Please enter a numer greater than 0"}
                        placeholder={"> 0"}/>    
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Product Thumbnail
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Information all images about the product
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input name="thumbnail_main" placeholder={"Url iamge"} label={"Thumbnail Main"}/>    
                        <Input name="thumbnail_1" placeholder={"Url iamge"} label={"Thumbnail"}/>    
                        <Input name="thumbnail_2" placeholder={"Url iamge"} label={"Thumbnail"}/>    
                        <Input name="thumbnail_3" placeholder={"Url iamge"} label={"Thumbnail"}/>    
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

export default ProductAdd
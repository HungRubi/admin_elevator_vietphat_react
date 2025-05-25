import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button, Textearea, InputGroup, PageTitle } from '../../components'
import icon from '../../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'

const { MdChevronRight, MdOutlineDiscount, AiOutlineDollarCircle, MdNumbers, MdVerified } = icon

const ProductAdd = () => {
    const dispatch = useDispatch();
    const {categoryProduct, message, suppliers} = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getCategoryProduct());
        dispatch(actions.getSuppliers());
    }, [dispatch])
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
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sale: '',
        cog: '',
        price: '',
        shipping_cost: '',
        unit: '',
        category: '',
        minimum: '',
        supplier: '',
        thumbnail_main: '',
        thumbnail_1: '',
        thumbnail_2: '',
        thumbnail_3: '',
        warranty_period: '',
    })
    const handleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem.id : e.target.value,
        })
    }
    const hanleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.createProduct(formData));
    } 
    const navigate = useNavigate()
    useEffect(() => {
        if(message === 'Thêm sản phẩm thành công') {
            navigate("/product")
        }
    }, [message, navigate])
    return (
        <div className="full pt-5">
            <PageTitle title={"Create Product"}/>
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
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={hanleSubmit}>
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
                        <Input 
                            label={"Name"} 
                            name={"name"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Textearea 
                            label={"Description"} 
                            row={5} 
                            name={"description"}
                            onChange={handleChange}
                            children={formData.description}
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"Discount"} 
                            icon={<MdOutlineDiscount className="text-[18px] text-gray-600"/>} 
                            name={"sale"} 
                            max={100}
                            placeholder={"0% to 100%"}
                            helper={"Please enter number from 0 to 100"}
                            onChange={handleChange}
                            value={formData.sale}
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"Price"}
                            helper={"Please enter a numer greater than 0"}
                            placeholder={"> 0"} 
                            icon={<AiOutlineDollarCircle className="text-[18px] text-gray-600"/>} 
                            name="price"
                            onChange={handleChange}
                            value={formData.price}
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"COG"}
                            helper={"Please enter a numer greater than 0"}
                            placeholder={"> 0"} 
                            icon={<AiOutlineDollarCircle className="text-[18px] text-gray-600"/>} 
                            name="cog"
                            onChange={handleChange}
                            value={formData.cog}
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"Shipping Cost"}
                            helper={"Please enter a larger number and units are in months"}
                            placeholder={"> 0"} 
                            icon={<AiOutlineDollarCircle className="text-[18px] text-gray-600"/>} 
                            name="shipping_cost"
                            onChange={handleChange}
                            value={formData.shipping_cost}
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"Warranty Period"}
                            helper={"Please enter a numer greater than 1"}
                            placeholder={"> 1"} 
                            icon={<MdVerified className="text-[18px] text-gray-600"/>} 
                            name="warranty_period"
                            onChange={handleChange}
                            value={formData.warranty_period}
                        />
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
                        <Combobox 
                            data={unit} 
                            label={"Unit"} 
                            name={"unit"} 
                            onChange={handleChange}
                            selected={formData.unit}
                        />
                        <Combobox 
                            data={categoryProduct} 
                            label={"Category"} 
                            name={"category"} 
                            onChange={handleChange}
                            selected={formData.category}
                        />
                        <Combobox
                            data={suppliers}
                            label={"Supplier"}
                            name={"supplier"}
                            onChange={handleChange}
                            selected={formData.supplier}
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"Minimum Of Stock"} 
                            icon={<MdNumbers className="text-[18px] text-gray-500"/>} 
                            name="minimum" 
                            helper={"Please enter a numer greater than 0"}
                            placeholder={"> 0"}
                            onChange={handleChange}
                            selected={formData.minimum}
                        />    
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
                        <Input 
                            name="thumbnail_main" 
                            placeholder={"Url iamge"} 
                            label={"Thumbnail"}
                            onChange={handleChange}
                            value={formData.thumbnail_main}
                        />    
                        <Input 
                            name="thumbnail_1" 
                            placeholder={"Url iamge"} 
                            label={"Thumbnail"}
                            onChange={handleChange}
                            value={formData.thumbnail_1}
                        />    
                        <Input 
                            name="thumbnail_2" 
                            placeholder={"Url iamge"} 
                            label={"Thumbnail"}
                            onChange={handleChange}
                            value={formData.thumbnail_2}
                        />    
                        <Input 
                            name="thumbnail_3" 
                            placeholder={"Url iamge"} 
                            label={"Thumbnail"}
                            onChange={handleChange}
                            value={formData.thumbnail_3}
                        />    
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/product"}>
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
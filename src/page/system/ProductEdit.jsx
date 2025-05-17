import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button, Textearea, InputGroup, PageTitle } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions'

const { MdChevronRight, MdOutlineDiscount, AiOutlineDollarCircle, MdNumbers } = icon

const ProductEdit = () => {
    const { detailProduct, categoryProduct, message, suppliers } = useSelector(state => state.app);
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

    })
    useEffect(() => {
        if(detailProduct){
            setFormData({
                name: detailProduct?.name,
                description: detailProduct?.description,
                sale: detailProduct?.sale,
                price: detailProduct?.price,
                shipping_cost: detailProduct?.shipping_cost,
                unit: detailProduct?.unit,
                cog: detailProduct?.cog,
                category: detailProduct?.category,
                minimum: detailProduct?.minimum,
                supplier: detailProduct?.supplier,
                thumbnail_main: detailProduct?.thumbnail_main,
                thumbnail_1: detailProduct?.thumbnail_1,
                thumbnail_2: detailProduct?.thumbnail_2,
                thumbnail_3: detailProduct?.thumbnail_3,
            })
        }
    }, [detailProduct])
    const handleChange = (e, selected ) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id : e.target.value
        })
    }
    const dispatch = useDispatch();
    const id = window.location.pathname.split('/').slice(-2, -1)[0];
    useEffect(() => {
        dispatch(actions.getProductsEdit(id));
        dispatch(actions.getSuppliers());
    }, [dispatch, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateProduct(formData, id))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === 'Cập nhật sản phẩm thành công :))'){
            navigate("/product")
        }
    }, [message, navigate])

    return (
        <div className="full pt-5">
            <PageTitle title={"Update Product"}/>
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
                        <NavLink to={'/product/:id/edit'} className={"text-blue-600"}>
                            Edit product
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Edit Product</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Edit a product of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
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
                            label={"Fullname"} 
                            name={"name"} 
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Textearea 
                            label={"Description"} 
                            row={10} 
                            name={"description"} 
                            onChange={handleChange}
                            children={formData.description}
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"Discount"} 
                            value={formData.sale}
                            icon={<MdOutlineDiscount className="text-[18px] text-gray-600"/>} 
                            name={"sale"} 
                            placeholder={"0% to 100%"}
                            onChange={handleChange}
                            helper={"Please enter number from 0 to 100"}
                        />
                        <InputGroup 
                            onChange={handleChange}
                            type={"number"} 
                            label={"Price"}
                            helper={"Please enter a numer greater than 0"}
                            placeholder={"> 0"} value={formData.price}
                            icon={<AiOutlineDollarCircle className="text-[18px] text-gray-600"/>} 
                            name="price"
                        />
                        <InputGroup 
                            onChange={handleChange}
                            type={"number"} 
                            label={"COG"}
                            helper={"Please enter a numer greater than 0"}
                            placeholder={"> 0"} value={formData.cog}
                            icon={<AiOutlineDollarCircle className="text-[18px] text-gray-600"/>} 
                            name="cog"
                        />
                        <InputGroup 
                            type={"number"} 
                            label={"Shipping Cost"}
                            onChange={handleChange}
                            helper={"Please enter a numer greater than 0"}
                            placeholder={"> 0"} value={formData.shipping_cost}
                            icon={<AiOutlineDollarCircle className="text-[18px] text-gray-600"/>} 
                            name="shipping_cost"
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
                            name="supplier" 
                            onChange={handleChange}
                            selected={formData.supplier}
                        />
                        <InputGroup 
                            type={"number"} 
                            onChange={handleChange}
                            label={"Minimum Of Stock"} 
                            icon={<MdNumbers className="text-[18px] text-gray-500"/>} 
                            name="minimum" 
                            helper={"Please enter a numer greater than 0"}
                            placeholder={"> 0"} 
                            value={formData.minimum}
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
                            value={formData.thumbnail_main} 
                            onChange={handleChange}
                            placeholder={"Url iamge"} 
                            label={"Thumbnail Main"}
                        />    
                        <Input 
                            name="thumbnail_1" 
                            value={formData.thumbnail_1} 
                            onChange={handleChange}
                            placeholder={"Url iamge"} 
                            label={"Thumbnail"}
                        />    
                        <Input 
                            name="thumbnail_2" 
                            value={formData.thumbnail_2} 
                            placeholder={"Url iamge"} 
                            onChange={handleChange}
                            label={"Thumbnail"}
                        />    
                        <Input 
                            name="thumbnail_3" 
                            value={formData.thumbnail_3} 
                            placeholder={"Url iamge"} 
                            onChange={handleChange}
                            label={"Thumbnail"}
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

export default ProductEdit
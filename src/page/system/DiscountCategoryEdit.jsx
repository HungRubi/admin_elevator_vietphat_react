import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button, Textearea, InputGroup } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions'

const { MdChevronRight, AiOutlineDollarCircle, BsTag } = icon

const DiscountCategoryEdit = () => {
    const navigate = useNavigate();
    const status = [
        {
            id: 'giảm theo phần trăm',
            text: 'giảm theo phần trăm',
        },
        {
            id: 'giảm theo số tiền cố định',
            text: 'giảm theo số tiền cố định',
        },
    ]

    const dispatch = useDispatch();
    const { categoryDiscountDetail, message } = useSelector(state => state.app);
    const id = window.location.pathname.split("/").slice(-2, -1)[0];
    useEffect(() => {
        dispatch(actions.getCategoryDiscountDetail(id))
    }, [])
    useEffect(() => {
        if(message === 'Cập nhật voucher thành công!'){
            navigate("/category/discount");
        }
    }, [message, navigate])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discount_type: '',
        value_discount: '',
        start_date: '',
        end_date: '',
        use_limit: '',
        minimum_purchase: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateDiscount(formData, id))
    }
    useEffect(() => {
        if(categoryDiscountDetail){
            setFormData({
                title: categoryDiscountDetail?.title || '',
                description: categoryDiscountDetail?.description || '',
                discount_type: categoryDiscountDetail?.discount_type || '',
                value_discount: categoryDiscountDetail?.value_discount || '',
                start_date: categoryDiscountDetail?.startDate || '',
                end_date: categoryDiscountDetail?.endDate || '',
                use_limit: categoryDiscountDetail?.use_limit || '',
                minimum_purchase: categoryDiscountDetail?.minimum_purchase || '',
            })
        }
    }, [categoryDiscountDetail])
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id : e.target.value
        })
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
                        <NavLink to={'/category/discount'}>
                            Category discount
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/discount/add'} className={"text-blue-600"}>
                            Edit discount
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Category Discount</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Edit a category discount of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Overview
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Your discount code information
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Title"} 
                            name={"title"} 
                            value={formData?.title}
                            onChange={handleChange}
                        />
                        <Textearea 
                            row={5} 
                            label={"Description"} 
                            name={"description"} 
                            children={formData?.description}
                            onChange={handleChange}
                        />
                        <Combobox 
                            data={status} 
                            onChange={handleChange}
                            label={"Discount Type"} 
                            name={"discount_type"} 
                            selected={formData?.discount_type}
                        />
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Discount Detail
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Your discount code information detail
                        </p>
                    </div>
                    <div className="flex-1">
                        <InputGroup 
                            label={"Minimum Purchase"} 
                            name={"minimum_purchase"}
                            value={formData?.minimum_purchase}
                            icon={<AiOutlineDollarCircle className="text-lg text-gray-600"/>}
                            onChange={handleChange}
                        />

                        <InputGroup 
                            label={"Discount Value"}
                            onChange={handleChange}
                            name={"value_discount"}
                            icon={<BsTag className="text-lg text-gray-600"/>}
                            type={"number"} 
                            value={formData?.value_discount}
                        />
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Discount Validity
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Your discount is valid from Start Date to End Date. Don't miss out.
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            type={"date"} 
                            label={"Start Date"} 
                            name={"start_date"} 
                            value={formData?.start_date}
                            onChange={handleChange}
                        />
                        <Input 
                            type={"date"} 
                            label={"End Date"} 
                            name={"end_date"} 
                            value={formData?.end_date}
                            onChange={handleChange}
                        />
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

export default DiscountCategoryEdit
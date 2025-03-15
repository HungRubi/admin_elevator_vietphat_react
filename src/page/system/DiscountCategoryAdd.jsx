import { NavLink } from "react-router-dom";
import { Input, Combobox, Button, Textearea, InputGroup } from '../../components'
import icon from '../../util/icon';

const { MdChevronRight, AiOutlineDollarCircle, BsTag } = icon

const DiscountCategoryAdd = () => {
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
                            Add discount
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Category Discount</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new category discount of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" method="POST">
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
                        <Input label={"Title"} name={"title"}/>
                        <Textearea row={5} label={"Description"} name={"description"}/>
                        <Combobox data={status} label={"Discount Type"} name={"discount_type"}/>
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
                        <InputGroup label={"Minimum Purchase"} 
                        icon={<AiOutlineDollarCircle className="text-lg text-gray-600"/>}
                        helper={"Please enter a number better than 0"}
                        pattern={"\b[1-9][0-9]*\b"} type={"number"}/>

                        <InputGroup label={"Discount Value"}
                        icon={<BsTag className="text-lg text-gray-600"/>}
                        type={"number"}/>
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
                        <Input type={"date"} label={"Start Date"} name={"start_date"}/>
                        <Input type={"date"} label={"End Date"} name={"end_date"}/>
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

export default DiscountCategoryAdd
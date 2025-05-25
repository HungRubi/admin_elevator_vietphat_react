import { NavLink } from "react-router-dom"
import { Button, Combobox, InputGroup, PageTitle, Textearea } from "../../components"
import icons from "../../util/icon"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as actions from "../../store/actions"

const  {MdChevronRight, FaMapMarkerAlt, BsPerson, MdOutlineDateRange} = icons

const WarrantyAdd = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getAdd());
    }, [dispatch])
    const { ordersByWarranty } = useSelector(state => state.app);
    const status = [
        {
            id: "đang xử lý",
            text: "Đang xử lý"
        },
        {
            id: "chấp thuận",
            text: "Chấp thuận"
        },
        {
            id: "bị hủy",
            text: "Bị hủy"
        },
    ]
    const [formData, setFormData] = useState({
        order_code: "",
        name: "",
        user_id: "",
        address: "",
        product_id: "",
        description: "",
        video: "",
        status: "",
        purchase_date: "",
        warranty_date: ""
    })
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id : e.target.value
        })
    }
    return (
        <div className="full pt-5">
            <PageTitle title="Add Warranty" />
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/warranty'}>
                            Warranty
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/warranty/add'} className={"text-blue-600"}>
                            Add warranty
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Warranty</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new warranty of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8">
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Warranty Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Details about your purchase and shipping status.
                        </p>
                    </div>
                    <div className="flex-1">
                        <Combobox
                            data={ordersByWarranty}
                            label={"Order code"}
                            onChange={handleChange}
                            name={"order_code"}
                            selected={formData.order_code}
                        />
                        <InputGroup 
                            type={"text"} 
                            label={"Customer"}
                            icon={<BsPerson className="text-[17px] text-gray-500"/>} 
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <InputGroup 
                            type={"address"} 
                            label={"Address"}
                            helper={"Please enter a numer greater than 0"}
                            icon={<FaMapMarkerAlt className="text-[17px] text-gray-500"/>} 
                            name="address"
                            onChange={handleChange}
                            value={formData.address}
                        />
                        <Textearea 
                            label={"Descripton"}
                            name={"description"}
                            row={10}
                            onChange={handleChange}
                            children={formData.name}
                        />
                    </div>
                </div>

                {/* Payment & Status Section */}
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Warranty Status & Period
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Check the current status and validity period of your warranty.
                        </p>
                    </div>
                    <div className="flex-1">
                        <InputGroup 
                            label={"Video Url"}
                            type={"text"}
                            name={"video"}
                            icon={<MdOutlineDateRange className="text-lg"/>}
                            helper={"Please enter url video, example: https://myvideo/video1"}
                            onChange={handleChange}
                            selected={formData.video}
                        />
                        <InputGroup 
                            label={"Purchase Date"}
                            type={"date"}
                            name={"purchase_date"}
                            icon={<MdOutlineDateRange className="text-lg"/>}
                            onChange={handleChange}
                            value={formData.purchase_date}
                        />
                        <InputGroup 
                            label={"Warranty Date"}
                            type={"date"}
                            name={"warranty_date"}
                            icon={<MdOutlineDateRange className="text-lg"/>}
                            onChange={handleChange}
                            value={formData.warranty_date}
                        />
                        <Combobox 
                            data={status} 
                            label={"Status"} 
                            name={"status"}
                            onChange={handleChange}
                            selected={formData.status}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
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

export default WarrantyAdd
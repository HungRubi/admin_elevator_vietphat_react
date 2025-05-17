import { NavLink, useNavigate, useParams } from "react-router-dom";
import icons from '../../util/icon';
import { InputGroup, Button } from '../../components';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const { MdChevronRight, BsPerson, MdCall, MdOutlineMail, FaMapMarkerAlt } = icons

const SupplierEdit = () => {
    const dispatch = useDispatch()
    const { detailSupplier, message } = useSelector(state => state.app);
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });
    useEffect(() => {
        dispatch(actions.getDetails(id))
    }, [])
    useEffect(() => {
        if(detailSupplier){
            setFormData({
                name: detailSupplier.name || "",
                phone: detailSupplier.phone || "",
                email: detailSupplier.email || "",
                address: detailSupplier.address || ""
            })
        }
    }, [detailSupplier])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.update(id, formData))
    }
    const navigate = useNavigate()
    useEffect(() => {
        if(message === "Cập nhật nhà cung cấp thành công"){
            navigate('/category/supplier')
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
                        <NavLink to={'/category/supplier'} className={"text-blue-600"}>
                            Supplier    
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category/supplier/add'} className={"text-blue-600"}>
                            Add supplier
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Supplier</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new supplier of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-[48.5px]">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Profile
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>
                    <div className="flex-1">
                        <InputGroup 
                            label={"Name"} 
                            name={"name"}
                            icon={<BsPerson className="text-lg text-gray-600"/>}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <InputGroup 
                            label={"Phone"} 
                            name={"phone"}
                            icon={<MdCall className="text-lg text-gray-600"/>}
                            onChange={handleChange}
                            value={formData.phone}
                        />
                        <InputGroup 
                            label={"Email"} 
                            name={"email"}
                            icon={<MdOutlineMail className="text-lg text-gray-600"/>}
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <InputGroup 
                            label={"Address"} 
                            name={"address"}
                            icon={<FaMapMarkerAlt className="text-lg text-gray-600"/>}
                            onChange={handleChange}
                            value={formData.address}
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

    );
}

export default SupplierEdit;
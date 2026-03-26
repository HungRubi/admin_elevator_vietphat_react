import { NavLink, useNavigate } from "react-router-dom"
import { Button, Combobox, InputGroup, PageTitle, Textearea, ButtonQuantity } from "../../components"
import icons from "../../util/icon"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as actions from "../../store/actions"
import {formatMony} from '../../util/formatMony'
import { toast } from "react-toastify"

const  {MdChevronRight, FaMapMarkerAlt, BsPerson, MdOutlineDateRange} = icons

const WarrantyAdd = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getAdd());
    }, [dispatch])
    const { ordersByWarranty } = useSelector(state => state.warranty);
    const { message } = useSelector(state => state.ui);
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
        products: [],
        description: "",
        video: "",
        status: "đang xử lý",
        purchase_date: "",
        warranty_date: "",
        orderDetail: ""
    })
    const handleChange = (e, selected) => {
        const {name} = e.target
        if (selected) {
            if(name === "order_code") {
                const orderDate = new Date(selected.order_date);
                const warrantyMonths = selected.orderDetail[0]?.product_id?.warranty_period || 1;
    
                // Tạo bản sao và cộng tháng
                const expirationDate = new Date(orderDate.getTime());
                expirationDate.setMonth(expirationDate.getMonth() + warrantyMonths);
    
                // Chuyển sang định dạng yyyy-mm-dd cho input
                const formattedForInput = expirationDate.toISOString().split("T")[0];
                setFormData({
                    ...formData,
                    [e.target.value]: selected.id,
                    user_id: selected.user_id._id,
                    order_code: selected._id, 
                    name: selected.user_id?.name || "",
                    address: selected.user_id?.address || "",
                    purchase_date: selected?.orderDate || "",
                    warranty_date: formattedForInput,
                    orderDetail: selected?.orderDetail || [],
                    products: selected?.orderDetail?.map(item => ({
                        product_id: item.product_id._id || item.product_id,
                        quantity: item.quantity
                    })) || []
                });
            }else {
                setFormData({
                    ...formData,
                    [name]: selected.id
                });
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    }
    const handleDeleteItem = (itemToDelete) => {
        if (formData.orderDetail.length <= 1) {
            toast.warn("Phải giữ lại ít nhất một sản phẩm.");
            return;
        }

        const productId = itemToDelete.product_id?._id;

        if (!productId) {
            console.warn('Cannot find product ID in item:', itemToDelete);
            return;
        }

        const updatedItems = formData.orderDetail.filter(item => String(item._id) !== String(itemToDelete._id));

        const updatedFormData = {
            ...formData,
            orderDetail: updatedItems,
            products: updatedItems.map(item => ({
                product_id: item.product_id._id || item.product_id,
                quantity: item.quantity
            }))
        };

        setFormData(updatedFormData);
    };

    const buildPayload = () => ({
        order_code: formData.order_code,
        user_id: formData.user_id,
        address: formData.address,
        products: Array.isArray(formData.products) ? formData.products : [],
        description: formData.description,
        video: formData.video,
        status: formData.status,
        purchase_date: formData.purchase_date,
        warranty_date: formData.warranty_date,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = buildPayload();
        const n = data.products.length;
        if (n < 1 || n > 50) {
            toast.warn("Cần từ 1 đến 50 dòng sản phẩm trong phiếu bảo hành.");
            return;
        }
        dispatch(actions.addWarranty(data));
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (message === "Thêm phiếu bảo hành thành công") {   
            navigate('/warranty');
        }
    }, [message, navigate])
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
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
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
                            children={formData.description}
                        />
                    </div>
                </div>

                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Warranty-Covered Products
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2 max-w-[70%]">
                            Explore our selection of products backed by warranty for added peace of mind and reliable after-sales support.
                        </p>
                    </div>
                    <div className="flex-1">
                        <ul className="w-full">
                            {formData.orderDetail?.length > 0 ? formData.orderDetail.map(item => (
                                <li key={item._id}
                                className="w-full border-b-custom order_items py-5">
                                    <div className="w-full flex items-center justify-between ">
                                        <div className="flex gap-2.5 items-center w-3/6">
                                            <div className="w-[50px] h-[50px] flex items-center justify-center">
                                                <Button type={"button"} onClick={() => handleDeleteItem(item)}
                                                className={"!p-0.5 !px-1 !text-sm text-white bg-blue-500 shadow"}>
                                                    Xóa
                                                </Button>
                                            </div>
                                            <div className="w-[90px] h-[90px] border border-[#cbd0dd] flex-none">
                                                <img src={item.product_id.thumbnail_main} alt={item.product_id.name}
                                                className='w-full object-cover' />
                                            </div>
                                            <div className="w-[80%]">
                                                <h5 className="line-clamp-1 font-medium text-base text-gray-700">
                                                    {item.product_id.name}
                                                </h5>
                                                <h5 className="text-sm line-clamp-1 mt-2">
                                                    Đơn giá: {formatMony(item.product_id.price)}đ
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-2/6">
                                            <ButtonQuantity 
                                                className="ml-4"
                                                value={item.quantity || 1}
                                                price={item.product_id.price}
                                                maxQuantity={item.quantity}
                                                onChange={(newQuantity) => {
                                                    const updatedOrderDetail = formData.orderDetail.map(detail => {
                                                        if (detail._id === item._id) {
                                                            return {
                                                                ...detail,
                                                                quantity: newQuantity,
                                                                totalPrice: newQuantity * item.product_id.price
                                                            };
                                                        }
                                                        return detail;
                                                    });

                                                    setFormData({
                                                        ...formData,
                                                        orderDetail: updatedOrderDetail,
                                                        products: updatedOrderDetail.map(d => ({
                                                            product_id: d.product_id._id || d.product_id,
                                                            quantity: d.quantity
                                                        }))
                                                    });
                                                }}
                                            />    
                                        </div>
                                        <div className="flex items-center whitespace-nowrap w-1/4">
                                            <span className="text-gray-500 text-sm leading-0">Category: </span> 
                                            <span className="font-medium ml-2 text-gray-700">{item.product_id?.category?.name || item.category}</span>    
                                        </div>
                                        <div className="flex justify-end items-center gap-2.5 leading-0 w-1/5">
                                            <h6 className='text-[25px] text-[#2f904b] font-medium'>
                                                {formatMony(item.totalPrice || (item.quantity || 1) * item.product_id?.price)}đ
                                            </h6>
                                        </div>
                                    </div>
                                </li>
                            )) : (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <p className="text-lg font-medium">No order have selected yet</p>
                                    <p className="text-sm text-gray-500">Please select order to choose products with warranty</p>
                                </div>
                            )}
                        </ul>

                    </div>
                </div>

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
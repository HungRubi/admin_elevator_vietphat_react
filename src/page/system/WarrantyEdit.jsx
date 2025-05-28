import { NavLink, useNavigate, useParams } from "react-router-dom"
import { Button, Combobox, InputGroup, PageTitle, Textearea, ButtonQuantity } from "../../components"
import icons from "../../util/icon"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as actions from "../../store/actions"
import {formatMony} from '../../util/formatMony'
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { loadFile } from '../../util/loadFile';
import { toast } from "react-toastify"

const  {MdChevronRight, FaMapMarkerAlt, BsPerson, MdOutlineDateRange} = icons

const WarrantyEdit = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(actions.getAdd());
        dispatch(actions.getDetail(id));
    }, [dispatch, id]);
    const { ordersByWarranty, message, warranty } = useSelector(state => state.app);
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
        code: "",
        order_code: "",
        name: "",
        phone: "",
        user_id: "",
        address: "",
        products: {},
        description: "",
        video: "",
        status: "đang xử lý",
        purchase_date: "",
        warranty_date: "",
        orderDetail: "",
        code_order: "",
    })
    useEffect(() => {
        if(warranty) {
            setFormData({
                code: warranty.code || "",
                order_code: warranty.order_code?._id || "",
                code_order: warranty.order_code?.order_code || "",
                name: warranty.user_id?.name || "",
                user_id: warranty.user_id?._id || "",
                phone: warranty.user_id?.phone || "",
                address: warranty.user_id?.address || "",
                products:  {
                    ...(warranty.product_id || {}),
                    quantity: warranty.quantity || 1,
                },
                description: warranty.description || "",
                video: warranty.video || "",
                status: warranty.status || "đang xử lý",
                purchase_date: warranty.purchaseDate || "",
                warranty_date: warranty.warrantyDate || "",
                orderDetail: warranty.orderDetail || [],
            });
        }
    }, [warranty])
    console.log(formData)
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
                    phone: selected.user_id?.phone || "",
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
    const data = {
        order_code: formData.order_code,
        user_id: formData.user_id,
        address: formData.address,
        products:formData.products,
        description: formData.description,
        video: formData.video,
        status: formData.status,
        purchase_date: formData.purchase_date,
        warranty_date: formData.warranty_date
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateWarranty(id, data))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (message === "Cập nhật phiếu bảo hành thành công") {
            navigate('/warranty');
        }
    }, [message, navigate])

    const handleExportInvoice = async () => {
        try {
            // Load template file
            const template = await loadFile('/mau-phieu-bao-hanh-file-word.docx');
            
            // Create PizZip instance
            const zip = new PizZip(template);
            
            // Create docxtemplater instance
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // Prepare data for template
            const data = {
                code: formData?.code || '',
                order_code: formData.code_order, 
                name: formData?.name || '',
                phone: formData?.phone || '',
                address: formData?.address || '',
                product: formData.products?.name || '',
                quantity: formData.products?.quantity || '1',
                purchase_date: formData.purchase_date || '',
                warranty_date: formData.warranty_date || '',
                description: formData.description || '',
                warranty_period: formData.products?.warranty_period || ''
            };

            // Render document
            doc.render(data);

            // Generate output
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });

            // Save file
            saveAs(out, `BaoHanh_KH_${formData?.name}.docx`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            toast.warn('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại!');
        }
    };
    return (
        <div className="full pt-5">
            <PageTitle title="Edit Warranty" />
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
                        <NavLink to={'/warranty'} className={"text-blue-600"}>
                            Edit order
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Warranty</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Edit a warranty of your company</h5>
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
                            {formData.products ? (
                                <li key={formData.products?._id}
                                className="w-full border-b-custom order_items py-5">
                                    <div className="w-full flex items-center justify-between ">
                                        <div className="flex gap-2.5 items-center w-3/6">
                                            <div className="w-[90px] h-[90px] border border-[#cbd0dd] flex-none">
                                                <img src={formData.products?.thumbnail_main} alt={formData.products?.name}
                                                className='w-full object-cover' />
                                            </div>
                                            <div className="w-[80%]">
                                                <h5 className="line-clamp-1 font-medium text-base text-gray-700">
                                                    {formData.products?.name}
                                                </h5>
                                                <h5 className="text-sm line-clamp-1 mt-2">
                                                    Đơn giá: {formatMony(formData.products?.price)}đ
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-2/6">
                                            <ButtonQuantity 
                                                className="ml-4"
                                                value={formData?.products?.quantity}
                                                price={formData.products[0]?.price}
                                                maxQuantity={warranty?.quantity}
                                                onChange={(newQuantity) => {
                                                    const updatedOrderDetail = {
                                                        ...formData.products,
                                                        quantity: newQuantity,
                                                        totalPrice: newQuantity * formData.products?.price
                                                    };
                                                    setFormData({
                                                        ...formData,
                                                        products: {
                                                            ...formData.products,
                                                            quantity: updatedOrderDetail.quantity,
                                                            totalPrice: newQuantity * formData.products?.price
                                                        }
                                                    });
                                                }}
                                            />    
                                        </div>
                                        <div className="flex items-center whitespace-nowrap w-1/4">
                                            <span className="text-gray-500 text-sm leading-0">Category: </span> 
                                            <span className="font-medium ml-2 text-gray-700">{formData.products?.category?.name || formData.products?.category}</span>    
                                        </div>
                                        <div className="flex justify-end items-center gap-2.5 leading-0 w-1/5">
                                            <h6 className='text-[25px] text-[#2f904b] font-medium'>
                                                {formatMony(formData.products?.totalPrice || (formData.products?.quantity || 1) * formData.products?.price)}đ
                                            </h6>
                                        </div>
                                    </div>
                                </li>
                            ) : (
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
                            value={formData.video}
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
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[350%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/user"}>
                            Cancel
                        </NavLink>
                    </Button>
                    <Button type="button" onClick={handleExportInvoice}
                    className={"absolute left-[77.777%] transform -translate-x-[220%] top-[50%] -translate-y-[50%] shadow-md !py-1 font-medium text-white bg-blue-500"}>
                        Export
                    </Button>
                    <Button type="submit" className={"absolute left-[77.777%] transform -translate-x-[100%] top-[50%] -translate-y-[50%] shadow-md !py-1 font-medium text-white bg-blue-500"}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default WarrantyEdit
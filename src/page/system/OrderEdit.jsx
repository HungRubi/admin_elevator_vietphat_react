import { NavLink, useNavigate } from "react-router-dom";
import { Combobox, Button, InputGroup, ListProductOrder, PageTitle } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { loadFile } from '../../util/loadFile';
import { formatMony } from "../../util/formatMony";
import { toast } from "react-toastify";

const { MdChevronRight, MdCall, FaMapMarkerAlt, BsTag, FiUserPlus } = icon

const OrderEdit = () => {
    const navigate = useNavigate();
    const productSelected = [1];
    const dispatch = useDispatch();
    const id = window.location.pathname.split('/').slice(-2,-1)[0];
    useEffect(() => {
        dispatch(actions.getOrderDetail(id));
    }, [dispatch, id])
    const {orderEditProduct, orderDetail, discountOrder, message} = useSelector(state => state.app);
    const totalPurchase = orderEditProduct?.reduce((acc, item ) => {
        return acc + (Number(item.price) * Number(item.quantity));
    }, 0);
    const shippingMoney = orderEditProduct?.reduce((acc, item ) => {
        return acc + item.shipping_cost
    }, 0) 
    let valueDiscount = 0;
    
    const payment = [
        {
            id: 'Thanh toán khi nhận hàng',
            text: 'Thanh toán khi nhận hàng',
        },
        {
            id: 'Ví điện tử Momo',
            text: 'Ví điện tử Momo',
        },
        {
            id: 'Atm nội địa',
            text: 'Atm nội địa',
        },
    ]
    const status = [
        {
            id: 'Thành công',
            text: 'Thành công',
        },
        {
            id: 'Đang xử lý',
            text: 'Đang xử lý',
        },
        {
            id: 'Đang giao hàng',
            text: 'Đang giao hàng',
        },
        {
            id: 'Thất bại',
            text: 'Thất bại',
        },
    ]
    const [formData, setFormData] = useState({
        shipping_address: {
            name: '',
            phone: '',
            address: ''
        },
        payment_method: '',
        status: '',
        items: {
            product_id: "",
            quantity: "",
        }
    })
    useEffect(() => {
        if (orderDetail) {
            setFormData({
                shipping_address: {
                    name: orderDetail?.shipping_address?.name || '',
                    phone: orderDetail?.shipping_address?.phone || '',
                    address: orderDetail?.shipping_address?.address || ''
                },
                payment_method: orderDetail?.payment_method || '',
                status: orderDetail?.status || '',
                items: orderEditProduct?.map(item => (
                    {
                        product_id: item.product_id,
                        quantity: item.quantity
                    }
                ))
            })
        }
    }, [orderDetail, orderEditProduct])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length === 2) {
            setFormData(prev => ({
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateOrder(id, formData));
    }
    useEffect(() => {
        if(message === "Cập nhật đơn hàng thành công") {
            navigate("/order");
        }
    }, [message, navigate])
    const shippingCost = orderEditProduct?.reduce((acc, item) => acc + item.shipping_cost, 0) || 0;
    const vat = Math.round((totalPurchase * 10) / 100);
    const handleExportInvoice = async () => {
        try {
            const discountValue = discountOrder?.value_discount || 0;
            // Load template file
            const template = await loadFile('/template_order.docx');
            
            // Create PizZip instance
            const zip = new PizZip(template);
            
            // Create docxtemplater instance
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // Format date
            const today = new Date();

            // Prepare data for template
            

            const data = {
                order_code: orderDetail?.order_code,
                name: formData.shipping_address?.name || '',
                phone: formData.shipping_address?.phone || '',
                address: formData.shipping_address?.address || '',
                p: orderEditProduct?.map((item, index) => ({
                    no: index + 1,
                    productName: item.name || '',
                    unit: item.unit || '',
                    quantity: item.quantity || 0,
                    price: formatMony(item.price) || '0',
                    purchers: formatMony(item.price * item.quantity) || '0',
                    shipping: formatMony(item.shipping_cost) || 0
                })),
                shipping: shippingCost,
                vat: formatMony(vat),
                discount: formatMony(discountValue) || 0,
                totalPrice: formatMony(totalPurchase + shippingCost - valueDiscount + vat) || '0',
                stringPrice: convertToWords(totalPurchase + shippingCost - valueDiscount + vat) || 'không đồng',
                date: today.getDate(),
                month: today.getMonth() + 1
            };
            // Render document
            doc.render(data);

            // Generate output
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });

            // Save file
            saveAs(out, `HoaDon_${formData.shipping_address?.name}.docx`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            toast.warn('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại!');
        }
    };

    // Helper function to convert number to words
    const convertToWords = (num) => {
        if (!num || num === 0) return 'không đồng';
        
        const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
        const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
        const hundreds = ['', 'một trăm', 'hai trăm', 'ba trăm', 'bốn trăm', 'năm trăm', 'sáu trăm', 'bảy trăm', 'tám trăm', 'chín trăm'];
        
        const convertThreeDigits = (n) => {
            if (n === 0) return '';
            const h = Math.floor(n / 100);
            const t = Math.floor((n % 100) / 10);
            const o = n % 10;
            
            let result = hundreds[h];
            if (t > 0) {
                result += ' ' + tens[t];
            }
            if (o > 0) {
                result += ' ' + ones[o];
            }
            return result.trim();
        };
        
        let result = '';
        const billion = Math.floor(num / 1000000000);
        const million = Math.floor((num % 1000000000) / 1000000);
        const thousand = Math.floor((num % 1000000) / 1000);
        const rest = num % 1000;
        
        if (billion > 0) {
            result += convertThreeDigits(billion) + ' tỷ ';
        }
        if (million > 0) {
            result += convertThreeDigits(million) + ' triệu ';
        }
        if (thousand > 0) {
            result += convertThreeDigits(thousand) + ' nghìn ';
        }
        if (rest > 0) {
            result += convertThreeDigits(rest);
        }
        
        return result.trim() + ' đồng';
    };
    return (
        <div className="full pt-5">
            <PageTitle title="Edit Order" />
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/order'}>
                            Order
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/order/:id/edit'} className={"text-blue-600"}>
                            Edit order
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Order</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Edit a order of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                <div className="w-full border-b-custom py-10">
                    <div className="w-full mb-5 border-b-custom pb-5">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Product Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            List of products you have ordered
                        </p>
                    </div>
                    <ListProductOrder data={orderEditProduct}/>
                    <div className="w-full border-t-custom flex pb-5 text-lg text-gray-700 gap-2.5">
                        <div className="w-4/6"></div>                        
                        <div className="w-2/6">
                            <div className="w-full flex items-center gap-5">
                                <div className="flex items-center gap-2.5 mt-5 leading-0">
                                    <BsTag className="text-main"/>
                                    <h5>Your voucher</h5>
                                </div>
                                <h5 className="mt-5 text-right flex-1 text-sm leading-0 font-medium">
                                    {orderEditProduct[0]?.discount}
                                </h5>
                            </div>
                            <div className="w-full border-t-custom mt-5 pt-5 text-right">
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Shipping:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {productSelected && productSelected.length > 0 ? `${shippingMoney?.toLocaleString("vi-VN")} ₫` : "0"}
                                    </div>
                                </div>
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Discount:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {productSelected && productSelected.length > 0 ? `${valueDiscount.toLocaleString("vi-VN")}` : "0"}
                                        <span className="text-sm"> ₫</span>
                                    </div>
                                </div>
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        VAT (10%): 
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {productSelected && productSelected.length > 0 ? `${formatMony(vat)}` : "0"}
                                        <span className="text-sm"> ₫</span>
                                    </div>
                                </div>
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Total:
                                    </div>
                                    <div className="w-1/2 text-right text-3xl font-medium text-main">
                                        <span className="text-xl">₫ </span>
                                        {productSelected && productSelected.length > 0 ? `${formatMony(totalPurchase + shippingCost - valueDiscount + vat)} ₫` : "0"}
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Customer Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            We are committed to protecting customer information.
                        </p>
                    </div>
                    <div className="flex-1">
                        <InputGroup 
                            type={"text"} 
                            label={"Full Name"} 
                            icon={<FiUserPlus className="text-[18px] text-gray-600"/>} 
                            name={"shipping_address.name"} 
                            placeholder={"Enter full name"}
                            value={formData.shipping_address.name}
                            onChange={handleChange}
                            helper={"Please enter customer's full name"}
                        />
                        <InputGroup 
                            type={"phone"} 
                            label={"Phone"} 
                            icon={<MdCall className="text-[18px] text-gray-600"/>} 
                            name={"shipping_address.phone"} 
                            placeholder={"Enter phone number"}
                            value={formData.shipping_address.phone}
                            onChange={handleChange}
                            helper={"Please enter customer's phone number"}
                        />
                        <InputGroup 
                            type={"address"} 
                            label={"Address"}
                            helper={"Please enter customer's address"}
                            icon={<FaMapMarkerAlt className="text-[17px] text-gray-500"/>} 
                            name="shipping_address.address"
                            value={formData.shipping_address.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Payment Method & Status Order
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Your order payment method and your order status
                        </p>
                    </div>
                    <div className="flex-1">
                        <Combobox 
                            data={payment} 
                            label={"Unit"} 
                            name={"payment_method"} 
                            selected={formData.payment_method}
                            onChange={handleChange}
                        />
                        <Combobox 
                            data={status} 
                            label={"status"} 
                            name={"status"} 
                            selected={formData.status}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[350%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/order"}>
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

export default OrderEdit
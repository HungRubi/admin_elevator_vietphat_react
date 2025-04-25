import { NavLink, useNavigate } from "react-router-dom";
import { Combobox, Button, InputGroup, ListProductOrder, PageTitle } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions';

const { MdChevronRight, MdCall, FaMapMarkerAlt, BsTag, FiUserPlus } = icon

const OrderEdit = () => {
    const navigate = useNavigate();
    const productSelected = [1];
    const dispatch = useDispatch();
    const id = window.location.pathname.split('/').slice(-2,-1)[0];
    useEffect(() => {
        dispatch(actions.getOrderDetail(id));
    }, [dispatch, id])
    const {orderEditProduct, orderDetail, discountOrder} = useSelector(state => state.app);
    const discountValue  = Number(discountOrder?.value_discount) || 0;
    const discountType = discountOrder?.discount_type || '';
    const minimumPurchase = Number(discountOrder?.minimum_purchase) || 0;
    const totalPurchase = orderEditProduct.reduce((acc, item ) => {
        return acc + (Number(item.price) * Number(item.quantity));
    }, 0);
    const shippingMoney = orderEditProduct.reduce((acc, item ) => {
        return acc + item.shipping_cost
    }, 0) 
    let purchase = 0;
    let valueDiscount = 0;
    if( totalPurchase > minimumPurchase){
        if(discountType === "giảm theo phần trăm") {
            valueDiscount = (totalPurchase * discountValue) / 100
            purchase = totalPurchase - valueDiscount + shippingMoney;
        }
        else
        {
            valueDiscount = discountValue;
            purchase = totalPurchase - discountValue + shippingMoney;
        }
    }
    
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
            })
        }
    }, [orderDetail])

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
        navigate("/order");
    }

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
                    <div className="w-full border-t-custom flex pb-5 border-b-custom text-lg text-gray-700 gap-2.5">
                        <div className="w-4/6"></div>                        
                        <div className="w-2/6">
                            <div className="w-full flex items-center gap-5">
                                <div className="flex items-center gap-2.5 mt-5 leading-0">
                                    <BsTag className="text-main"/>
                                    <h5>Your voucher</h5>
                                </div>
                                <h5 className="mt-5 text-right flex-1 text-sm leading-0 font-medium">
                                    {discountOrder?.title}
                                </h5>
                            </div>
                            <div className="w-full border-t-custom mt-5 pt-5 text-right">
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Shipping:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {productSelected && productSelected.length > 0 ? `${shippingMoney.toLocaleString("vi-VN")} đ` : "0"}
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
                                        Total:
                                    </div>
                                    <div className="w-1/2 text-right text-3xl font-medium text-main">
                                        <span className="text-xl">₫ </span>
                                        {productSelected && productSelected.length > 0 ? `${purchase.toLocaleString("vi-VN")}` : "0"}
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
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/article"}>
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

export default OrderEdit
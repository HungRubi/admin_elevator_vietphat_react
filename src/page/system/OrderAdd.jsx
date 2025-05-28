import { NavLink, useNavigate } from "react-router-dom";
import { Combobox, Button, InputGroup, ListProductOrder, SelectiObject, ModalList, PageTitle } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from '../../store/actions';
import { formatMony } from '../../util/formatMony';

const { MdChevronRight, MdOutlineDiscount, FaMapMarkerAlt, BsTag } = icon

const OrderAdd = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {orderUser, orderProduct, orderDiscount, productsByOrder} = useSelector(state => state.app);

    // States
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [dataProductOrder, setDataProductOrder] = useState([]);
    const [info, setInfo] = useState({
        id: '',
        name: '',
        phone: '',
        address: '',
        payment_method: '',
        status: '',
        discount: '',
    });
    const [discountInfo, setDiscountInfo] = useState({
        id: '',
        type: '',
        value: '',
        minimumPurchase: '',
    });
    // Effects
    useEffect(() => {
        dispatch(actions.getOrderAdd());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(productsByOrder)) {
            try {
                const parsedArray = productsByOrder.map(item => {
                    // Kiểm tra nếu item đã là object thì không cần parse
                    if (typeof item === 'object') {
                        return item;
                    }
                    // Nếu là string thì parse
                    return JSON.parse(item);
                });
                setDataProductOrder(parsedArray);

                if(parsedArray.length > 0) {
                    const newShipping = parsedArray.reduce((acc, curr) => acc + curr.shipping_cost, 0);
                    const newTotal = parsedArray.reduce((acc, curr) => acc + (curr.quantity || 1) * curr.price, 0);
                    
                    setShipping(newShipping);
                    setTotal(newTotal);
                }
            } catch (err) {
                console.error('❌ Lỗi khi parse từng phần tử:', err);
            }
        } else {
            console.warn("❗ productsByOrder không phải là mảng");
        }
    }, [productsByOrder]);

    // Constants
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
    ];

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
    ];

    const cbxDiscount = orderDiscount?.map(item => ({
        id: item?.id,
        text: item?.title,
    }));

    // Handlers
    const handleSelectedUser = (user) => {
        setInfo(prev => ({
            ...prev,
            id: user.value,
            name: user.name,
            phone: user.phone,
            address: user.address,
        }));
    };

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        
        if (name === 'discount') {
            // Trim whitespace and find discount
            const selectedDiscount = orderDiscount.find(item => 
                item.title.trim() === value.trim()
            );
            if (selectedDiscount) {
                setDiscountInfo({
                    id: selectedDiscount._id,
                    type: selectedDiscount.discount_type,
                    value: selectedDiscount.value_discount,
                    minimumPurchase: selectedDiscount.minimum_purchase,
                });
            }
        }

        setInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuantityChange = (productId, newQuantity, newPrice) => {
        setDataProductOrder(prev => {
            const updatedProducts = prev.map(item => 
                item._id === productId 
                    ? { ...item, quantity: newQuantity, totalPrice: newPrice }
                    : item
            );
            
            // Tính toán lại shipping và total
            const newShipping = updatedProducts.reduce((acc, curr) => acc + curr.shipping_cost, 0);
            const newTotal = updatedProducts.reduce((acc, curr) => acc + (curr.quantity || 1) * curr.price, 0);
            
            setShipping(newShipping);
            setTotal(newTotal);
            
            return updatedProducts;
        });
    };

    // Calculate final price with discount
    const calculateFinalPrice = () => {
        let finalTotal = total;
        if (discountInfo.type && discountInfo.value) {
            if (discountInfo.type === 'giảm theo số tiền cố định') {
                // Giảm giá theo số tiền cố định
                finalTotal = total - discountInfo.value;
            } else if (discountInfo.type === 'giảm giá phần trăm') {
                // Giảm giá theo phần trăm
                const discountAmount = (total * discountInfo.value) / 100;
                finalTotal = total - discountAmount;
            }
        }
        return finalTotal;
    };

    const finalPrice = calculateFinalPrice();
    const discountAmount = total - finalPrice;
    const data = {
        user_id: info.id,
        total_price: finalPrice + shipping,
        shipping_address: {
            name: info.name,
            phone: info.phone,
            address: info.address,
        },
        shipping_cost: shipping,
        discount: discountInfo.id,
        payment_method: info.payment_method,
        status: info.status,
        items: dataProductOrder.map(item => ({
            product_id: item._id,
            quantity: item.quantity,
            price: item.price,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.addOrder(data));
        navigate('/order')
    }
    return (
        <div className="full pt-5">
            <PageTitle title="Add Order" />
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
                        <NavLink to={'/order/add'} className={"text-blue-600"}>
                            Add order
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Order</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Add a new order of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                {/* Product Information Section */}
                <div className="w-full border-b-custom py-10">
                    <div className="w-full mb-5 border-b-custom pb-5">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Product Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            List of products of your order
                        </p>
                        <ModalList 
                            btn={"Add product"} 
                            data={orderProduct}
                            existingProducts={dataProductOrder}
                        />
                    </div>
                    {dataProductOrder && dataProductOrder.length > 0 ? 
                        (<ListProductOrder 
                            data={dataProductOrder} 
                            quantityClass={"flex"}
                            onQuantityChange={handleQuantityChange}
                        />) 
                        :
                        (
                            <div className="w-full flex items-center flex-col justify-center pb-10">
                                <img src="/img/default/empty_product.png" alt="" className=" opacity-25 w-[70px]"/>
                                <h5 className="font-medium text-gray-700 mt-2.5">No products</h5>
                                <h5 className="text-gray-500">Add product to your order</h5>
                                <ModalList btn={"Add product"} data={orderProduct}/>
                            </div>
                        )
                    }
                    
                    <div className="w-full border-t-custom flex pb-5 border-b-custom text-lg text-gray-700 gap-2.5">
                        <div className="w-4/6"></div>                        
                        <div className="w-2/6">
                            <div className="w-full flex items-center gap-5">
                                <div className="flex items-center gap-2.5 mt-5 leading-0">
                                    <BsTag className="text-main"/>
                                    <h5>Your voucher</h5>
                                </div>
                                <div className="flex-1">
                                    <Combobox 
                                        data={cbxDiscount} 
                                        name={"discount"} 
                                        className={"w-full"}
                                        selected={info.discount}
                                        onChange={handleChangeInfo}
                                    />
                                </div>
                            </div>
                            <div className="w-full border-t-custom mt-5 pt-5 text-right">
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Shipping:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {formatMony(shipping)} đ
                                    </div>
                                </div>
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Discount:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {formatMony(discountAmount)} đ
                                        {discountInfo.type === 'percentage' && (
                                            <span className="text-sm text-gray-500 ml-2">
                                                ({discountInfo.value}%)
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Total:
                                    </div>
                                    <div className="w-1/2 text-right text-3xl font-medium text-main">
                                        {formatMony(finalPrice + shipping)} đ
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>

                {/* Customer Information Section */}
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
                        <SelectiObject 
                            label={"Fullname"} 
                            name={"shipping_address[name]"} 
                            data={orderUser}
                            onSelectedUser={handleSelectedUser}   
                        />
                        <InputGroup 
                            type={"phone"} 
                            label={"Phone"}
                            icon={<MdOutlineDiscount className="text-[18px] text-gray-600"/>} 
                            name={"phone"} 
                            placeholder={"0% to 100%"}
                            helper={"Please enter number from 0 to 100"}
                            value={info.phone}
                            onChange={handleChangeInfo}
                        />
                        <InputGroup 
                            type={"address"} 
                            label={"Address"}
                            helper={"Please enter a numer greater than 0"}
                            icon={<FaMapMarkerAlt 
                            className="text-[17px] text-gray-500"/>} 
                            name="address"
                            value={info.address}
                            onChange={handleChangeInfo}
                        />
                    </div>
                </div>

                {/* Payment & Status Section */}
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
                            label={"Payment"} 
                            name={"payment_method"}
                            selected={info.payment_method}
                            onChange={handleChangeInfo}
                        />
                        <Combobox 
                            data={status} 
                            label={"Status"} 
                            name={"status"}
                            selected={info.status}
                            onChange={handleChangeInfo}
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

export default OrderAdd
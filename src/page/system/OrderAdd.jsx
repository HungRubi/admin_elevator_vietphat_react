import { NavLink } from "react-router-dom";
import { Combobox, Button, InputGroup, ListProductOrder, SelectiObject, ModalList, PageTitle } from '../../components'
import icon from '../../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions';

const { MdChevronRight, MdOutlineDiscount, FaMapMarkerAlt, BsTag } = icon

const OrderAdd = () => {
    const productSelected = [];
    const dispatch = useDispatch();
    const {orderUser, orderProduct, orderDiscount} = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getOrderAdd());
    }, [])
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
    const cbxDiscount = [];
    for(let i = 0; i < orderDiscount.length; i++){
        cbxDiscount.push({
            id: orderDiscount[i]?.id,
            text: orderDiscount[i]?.title,
        });
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
            <form className="w-full px-[30px] bg-white mt-8" method="POST">
                <div className="w-full border-b-custom py-10">
                    <div className="w-full mb-5 border-b-custom pb-5">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Product Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            List of products of your order
                        </p>
                        <ModalList btn={"Add product"} data={orderProduct}/>
                    </div>
                    {productSelected && productSelected.length > 0 ? 
                        (<ListProductOrder quantityClass={"flex"}/>) 
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
                                    <Combobox data={cbxDiscount} name={"unit"} className={"w-full"}/>
                                </div>
                            </div>
                            <div className="w-full border-t-custom mt-5 pt-5 text-right">
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Shipping:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {productSelected && productSelected.length > 0 ? "50.000đ" : "0"}
                                    </div>
                                </div>
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Discount:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        {productSelected && productSelected.length > 0 ? "- 50.000đ" : "0"}
                                    </div>
                                </div>
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Total:
                                    </div>
                                    <div className="w-1/2 text-right text-3xl font-medium text-main">
                                        {productSelected && productSelected.length > 0 ? "3.600.000đ" : "0"}
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
                        <SelectiObject label={"Fullname"} name={"shipping_address[name]"} data={orderUser}/>
                        <InputGroup type={"phone"} label={"Phone"}
                        icon={<MdOutlineDiscount className="text-[18px] text-gray-600"/>} 
                        name={"shipping_address[phone]"} placeholder={"0% to 100%"}
                        helper={"Please enter number from 0 to 100"}/>
                        <InputGroup type={"address"} label={"Address"}
                        helper={"Please enter a numer greater than 0"}
                        icon={<FaMapMarkerAlt className="text-[17px] text-gray-500"/>} name="shipping_address[address]"/>
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
                        <Combobox data={payment} label={"Payment"} name={"payment_method"}/>
                        <Combobox data={status} label={"Status"} name={"status"}/>
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

export default OrderAdd
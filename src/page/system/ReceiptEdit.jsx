import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import icons from '../../util/icon';
import { ListProductBySupplier, ListProductOrder, InputGroup, Combobox, Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'
import {formatMony} from '../../util/formatMony'

const { MdChevronRight, FiUserPlus, MdOutlineDateRange } = icons;

const ReceiptEdit = () => {
    const statusList = [
        {id: 'chưa xác nhận', text: 'Chưa xác nhận'},
        {id: 'đã xác nhận', text: 'Đã xác nhận'},
        {id: 'đã hủy', text: 'Đã hủy'},
    ]
    const { id } = useParams();
    const dispatch = useDispatch();
    const {receipt, receiptDetail, message} = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getDetailReceipt(id))
    }, [dispatch, id])
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [formData, setFormData] = useState({
        supplier: "",
        supplierName: "",
        item: [],
        totalPrice: "",
        status: "",
        dateEntry: "",
    })
    useEffect(() => {
        if(receipt && receiptDetail){
            setFormData({
                supplier: receipt.supplier?._id || "",
                supplierName: receipt.supplier?.name || "",
                item: receiptDetail.map(receipt => ({
                    product: receipt?.product_id?._id,
                    quantity: receipt?.quantity,
                    price: receipt?.price
                })),
                totalPrice: receipt?.totalPrice,
                status: receipt?.status,
                dateEntry: receipt?.dateFormat
            })
            // Initialize selectedProducts with receiptDetail data
            setSelectedProducts(receiptDetail.map(item => ({
                ...item.product_id,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.price * item.quantity
            })))
            setCurrentSupplier(receipt.supplier?._id)
        }
    }, [receipt, receiptDetail])
    const handleProductsSelect = (products, supplierId) => {
        // Get supplier name from first product
        const supplierName = products[0]?.supplier?.name || "";
        
        // Map products to item format
        const items = products.map(product => ({
            product: product._id,
            quantity: product.quantity || 1,
            price: product.price,
            totalPrice: product.price * (product.quantity || 1)
        }));

        if (currentSupplier && currentSupplier !== supplierId) {
            setSelectedProducts(products.map(product => ({
                ...product,
                quantity: product.quantity || 1,
                totalPrice: product.price * (product.quantity || 1)
            })));
            setFormData(prev => {
                const newItems = items;
                const newTotalPrice = newItems.reduce((total, item) => total + item.totalPrice, -50000);
                return {
                    ...prev,
                    supplier: supplierId,
                    supplierName: supplierName,
                    item: newItems,
                    totalPrice: newTotalPrice
                };
            });
        } else {
            setSelectedProducts(prev => [...prev, ...products.map(product => ({
                ...product,
                quantity: product.quantity || 1,
                totalPrice: product.price * (product.quantity || 1)
            }))]);
            setFormData(prev => {
                const newItems = [...prev.item, ...items];
                const newTotalPrice = newItems.reduce((total, item) => total + item.totalPrice, -50000);
                return {
                    ...prev,
                    supplier: supplierId,
                    supplierName: supplierName,
                    item: newItems,
                    totalPrice: newTotalPrice
                };
            });
        }
        setCurrentSupplier(supplierId);
    }

    const handleQuantityChange = (productId, newQuantity) => {
        // Update selectedProducts state
        setSelectedProducts(prev => prev.map(product => {
            if (product._id === productId) {
                const newTotalPrice = product.price * newQuantity;
                return {
                    ...product,
                    quantity: newQuantity,
                    totalPrice: newTotalPrice
                };
            }
            return product;
        }));

        // Update formData.item and totalPrice state
        setFormData(prev => {
            const newItems = prev.item.map(item => {
                if (item.product === productId) {
                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: item.price * newQuantity
                    };
                }
                return item;
            });
            
            // Calculate new total price from selectedProducts
            const newTotalPrice = selectedProducts
                .reduce((total, product) => {
                    const productTotal = product._id === productId 
                        ? product.price * newQuantity 
                        : product.totalPrice;
                    return total + productTotal;
                }, 0);

            return {
                ...prev,
                item: newItems,
                totalPrice: newTotalPrice + 50000 // Add shipping cost
            };
        });
    };
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateReceipt(id, formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật phiếu nhập thành công"){
            navigate("/receipt")
        }
    }, [navigate, message])
    return (
        <div className="w-full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/receipt'} className={"text-blue-600"}>
                            Receipt
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={`/receipt/${id}/edit`} className={"text-blue-600"}>
                            Edit receipt
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-[600]">Receipt</h2>
                    <h5 className="text-[12px] text-[#6d6c6c]">Edit a receipt of your company</h5>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={handleSubmit}>
                <div className="w-full border-b-custom py-10">
                    <div className="w-full mb-5 pb-5">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Receipt Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            List of receipt you have ordered
                        </p>
                        
                        {selectedProducts.length > 0 ? (
                            <div className="w-full">
                                <ListProductOrder 
                                    data={selectedProducts} 
                                    onQuantityChange={handleQuantityChange}
                                />
                                <ListProductBySupplier btn="Add More Products" onProductsSelect={handleProductsSelect} />
                            </div>
                        ) : (
                            <div className="w-full flex items-center flex-col justify-center pb-10">
                                <img src="/img/default/empty_product.png" alt="" className=" opacity-35 w-[100px]"/> 
                                <ListProductBySupplier btn="Add Product" onProductsSelect={handleProductsSelect} />
                                <h5 className="font-medium text-gray-700 mt-2.5">No products</h5>
                                <h5 className="text-gray-500">Add product to your order</h5>
                            </div>
                        )}
                    </div>
                    <div className="w-full border-t-custom flex pb-5 text-lg text-gray-700 gap-2.5">
                        <div className="w-4/6"></div>                        
                        <div className="w-2/6">
                            <div className="w-full mt-5 pt-5 text-right">
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Shipping:
                                    </div>
                                    <div className="w-1/2 text-right font-[600]">
                                        50.000 đ
                                    </div>
                                </div>
                                
                                <div className="w-full flex leading-10">
                                    <div className="w-1/2 text-left text-gray-500">
                                        Total:
                                    </div>
                                    <div className="w-1/2 text-right text-3xl font-medium text-main">
                                        <span className="text-xl">₫ </span>
                                        {formatMony(formData.totalPrice)}
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>

                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Supplier Information
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            We are committed to protecting customer information.
                        </p>
                    </div>
                    <div className="flex-1">
                        <InputGroup 
                            type={"text"} 
                            label={"Supplier"} 
                            icon={<FiUserPlus className="text-[18px] text-gray-600"/>} 
                            name={"supplier"} 
                            value={formData.supplierName}
                            readOnly
                        />
                        <InputGroup 
                            type={"date"} 
                            label={"Date Entry"} 
                            icon={<MdOutlineDateRange className="text-[18px] text-gray-600"/>} 
                            name={"dateEntry"} 
                            value={formData.dateEntry}
                            onChange={handleChange}
                        />
                        <Combobox 
                            data={statusList}
                            label={"Status"} 
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

export default ReceiptEdit
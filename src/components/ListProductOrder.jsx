import ButtonQuantity from "./ButtonQuantity";
import PropTypes from "prop-types";

const ListProductOrder = ({data, handleCheckBoxChange, onQuantityChange, onSelect, selectedProducts = []}) => {
    function format(params) {
        return params?.toLocaleString("vi-VN");
    }
    
    const handleQuantityChange = (productId, newQuantity) => {
        const product = data.find(item => item._id === productId);
        if (product) {
            const newPrice = product.price * newQuantity;
            onQuantityChange?.(productId, newQuantity);
            product.quantity = newQuantity;
            product.totalPrice = newPrice;
        }
    }

    const handleCheckBox = (e) => {
        const {value} = e.target;
        if (handleCheckBoxChange) {
            handleCheckBoxChange(e);
        } else if (onSelect) {
            const product = JSON.parse(value);
            onSelect(product);
        }
    }
    
    return (
        <ul className="w-full">
            {data?.map((item) => (
                <li key={item._id}
                className="w-full border-b-custom order_items py-5">
                    <div className="w-full flex items-center justify-between ">
                        <div className="flex gap-2.5 items-center w-2/5">
                            <div className="w-[50px] h-[50px] flex items-center justify-center">
                                <input 
                                    type="checkbox" 
                                    className="scale-125" 
                                    value={JSON.stringify(item)} 
                                    onChange={handleCheckBox}
                                    checked={selectedProducts.some(p => p._id === item._id)}
                                />
                            </div>
                            <div className="w-[90px] h-[90px] border border-[#cbd0dd] flex-none">
                                <img src={item.thumbnail_main} alt={item.name}
                                className='w-full object-cover' />
                            </div>
                            <div className="w-[80%]">
                                <h5 className="line-clamp-1 font-medium text-base text-gray-700">
                                    {item.name}
                                </h5>
                                <h5 className="text-sm line-clamp-1 mt-2">
                                    Đơn giá: {format(item.price)}đ
                                </h5>
                            </div>
                        </div>
                        <div className="flex items-center w-2/6">
                            <span className="text-gray-500 text-sm leading-0">Quantity: </span> 
                            <ButtonQuantity 
                                className="ml-4"
                                value={item.quantity || 1}
                                price={item.price}
                                onChange={(newQuantity) => handleQuantityChange(item._id, newQuantity)}
                            />    
                        </div>
                        <div className="flex items-center whitespace-nowrap w-1/4">
                            <span className="text-gray-500 text-sm leading-0">Category: </span> 
                            <span className="font-medium ml-2 text-gray-700">{item.category?.name || item.category}</span>    
                        </div>
                        <div className="flex justify-end items-center gap-2.5 leading-0 w-1/4">
                            <h6 className='text-[25px] text-[#2f904b] font-medium'>
                                {format(item.totalPrice || (item.quantity || 1) * item.price)}đ
                            </h6>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

ListProductOrder.propTypes = {
    data: PropTypes.array.isRequired,
    handleCheckBoxChange: PropTypes.func,
    onQuantityChange: PropTypes.func,
    onSelect: PropTypes.func,
    selectedProducts: PropTypes.array
}

export default ListProductOrder;
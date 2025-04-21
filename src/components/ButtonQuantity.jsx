import PropTypes from "prop-types"
import { useState } from "react"

const ButtonQuantity = ({className, value, onChange, onPriceChange, price}) => {
    const [quantity, setQuantity] = useState(value || 1);

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onChange?.(newQuantity);
            onPriceChange?.(newQuantity * price);
        }
    }

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange?.(newQuantity);
        onPriceChange?.(newQuantity * price);
    }

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value) || 1;
        setQuantity(newValue);
        onChange?.(newValue);
        onPriceChange?.(newValue * price);
    }

    return (
        <div className={`flex items-center ${className}`}>
            <button 
                type="button"  
                className="leading-0 w-[30px] h-[30px] flex items-center justify-center !bg-transparent !text-black border border-[#cbd0dd] text-[18px] cursor-pointer"
                onClick={handleDecrease}
            >
                -
            </button>
            <input 
                type="number" 
                value={quantity} 
                min="1"
                onChange={handleChange}
                className='text-center h-[30px] w-[50px] border-t bg-white border-t-[#cbd0dd] border-b border-b-[#cbd0dd] outline-0' 
            />
            <button 
                type="button"
                className="w-[30px] h-[30px] flex items-center justify-center !bg-transparent !text-black border border-[#cbd0dd] text-[18px] cursor-pointer leading-0"
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    )
}

ButtonQuantity.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    onPriceChange: PropTypes.func,
    price: PropTypes.number
}

export default ButtonQuantity
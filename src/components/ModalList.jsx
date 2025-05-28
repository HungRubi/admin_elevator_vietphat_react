import { useState } from "react";
import PropTypes from "prop-types";
import icon from '../util/icon'
import ListProductOrder from "./ListProductOrder";
import PageBar from "./PageBar";
import { useDispatch } from "react-redux";
import * as actions from '../store/actions';

const {IoClose} = icon;
const ModalList = ({btn, data, existingProducts = []}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const limit = 4;
    const lastOrderIndex = current * limit;
    const firstOrderIndex = lastOrderIndex - limit;

    // Lọc ra các sản phẩm chưa được chọn
    const filteredData = data?.filter(item => {
        return !existingProducts.some(existing => existing._id === item._id);
    });

    const currentOrder = filteredData?.slice(firstOrderIndex, lastOrderIndex);
    const dispatch = useDispatch();
    const [productSelected, setProductSelected] = useState([]);

    const handleCheckBoxChange = (e) => {
        const {value, checked} = e.target;
        const product = JSON.parse(value);
        
        // Kiểm tra xem sản phẩm đã tồn tại trong đơn hàng chưa
        const isDuplicate = existingProducts.some(item => item._id === product._id);
        
        if (checked && isDuplicate) {
            setErrorMessage(`Sản phẩm "${product.name}" đã tồn tại trong đơn hàng của bạn`);
            e.target.checked = false;
            return;
        }

        setErrorMessage('');
        setProductSelected((prev) => {
            if(checked){
                return [...prev, value]
            }else{
                return prev.filter(item => item !== value);
            }
        });
    }

    const addProductByOrder = () => {
        if (productSelected.length === 0) {
            setErrorMessage('Vui lòng chọn ít nhất một sản phẩm');
            return;
        }
        dispatch(actions.addProductByOrder(productSelected));
        setIsOpen(false);
        setProductSelected([]);
        setErrorMessage('');
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="shadow-md py-1 font-medium text-white bg-blue-500 mt-5 px-3.5 flex items-center justify-center border-custom rounded-[5px] cursor-pointer transition duration-300 ease-linear"
            >
                {btn}
            </button>

            {isOpen && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-[#6b696959]">
                    <div className="relative p-4 w-full max-w-[80%] bg-div rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-b-custom">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-5">
                                Products List <br />
                                <span className="text-sm font-normal text-gray-400">Select products to add to your order</span>
                            </h3>
                            <button
                            onClick={() => {
                                setIsOpen(false);
                                setErrorMessage('');
                                setProductSelected([]);
                            }}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex items-center justify-center">
                                <IoClose className="text-lg"/>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 bg-white">
                            {errorMessage && (
                                <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50">
                                    {errorMessage}
                                </div>
                            )}
                            <ListProductOrder data={currentOrder} handleCheckBoxChange={handleCheckBoxChange}/>
                            <PageBar currentPage={current} totalPage={Math.ceil(data.length / limit)} 
                            className={"!my-2"} onPageChange={setCurrent}/>
                        </div>
                        <button 
                        onClick={addProductByOrder}
                        type="button"
                        className="uppercase mt-5 text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            {btn}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

ModalList.propTypes = {
    btn: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    existingProducts: PropTypes.array
}

export default ModalList;

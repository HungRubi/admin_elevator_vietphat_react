import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions';
import Combobox from './Combobox';
import ListProductOrder from './ListProductOrder';

const ListProductBySupplier = ({btn, onProductsSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(actions.getSuppliers());
    }, [dispatch])
    
    const { suppliers, productsBySupplier } = useSelector(state => state.app);
    const [formData, setFormData] = useState({
        supplier: "",
    });

    const handleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem._id : e.target.value,
        });
        // Reset selected products when supplier changes
        setSelectedProducts([]);
    }

    useEffect(() => {
        if (formData.supplier) {
            dispatch(actions.getProductBySupplier(formData.supplier));
        }
    }, [formData.supplier, dispatch])

    const handleProductSelect = (product) => {
        setSelectedProducts(prev => {
            const exists = prev.find(p => p._id === product._id);
            if (exists) {
                return prev.filter(p => p._id !== product._id);
            }
            return [...prev, product];
        });
    }

    const handleAddProducts = () => {
        if (selectedProducts.length > 0) {
            onProductsSelect(selectedProducts, formData.supplier);
            setSelectedProducts([]);
            setIsOpen(false);
        }
    }

    return (    
        <div>
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
                        <div className="p-4 md:p-5 rounded-t">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-5">
                                Products List <br />
                                <span className="text-sm font-normal text-gray-400">
                                    Select products to add to your order
                                </span>
                            </h3>
                        </div>
                        <div className="px-5 pb-5 pt-0.5 bg-white max-h-150 overflow-y-auto">
                            <Combobox 
                                data={suppliers}
                                label={"Supplier"}
                                name={"supplier"}
                                className={"w-100"}
                                selected={formData.supplier}
                                onChange={handleChange}
                            />
                            <ListProductOrder 
                                data={productsBySupplier} 
                                onSelect={handleProductSelect}
                                selectedProducts={selectedProducts}
                            />
                        </div>
                        <div className="w-full flex items-center justify-end gap-10 mt-7">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setSelectedProducts([]);
                                }}
                                className="text-gray-600 bg-transparent font-medium"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddProducts}
                                type="button"
                                className="shadow-md py-1 font-medium text-white bg-blue-500 px-3.5 flex items-center justify-center border-custom rounded-[5px] cursor-pointer transition duration-300 ease-linear">
                                {btn}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

ListProductBySupplier.propTypes = {
    btn: PropTypes.string,
    onProductsSelect: PropTypes.func.isRequired,
}

export default ListProductBySupplier;
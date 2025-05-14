import { useState } from 'react';
import PropTypes from 'prop-types';
import icons from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from '../store/actions';
import Combobox from './Combobox';
const { IoClose } = icons;

const ListProductBySupplier = ({btn}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getSuppliers());
    }, [dispatch])
    const { suppliers } = useSelector(state => state.app);
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
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-b-custom">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white leading-5">
                                Products List <br />
                                <span className="text-sm font-normal text-gray-400">Select products to add to your order</span>
                            </h3>
                            <Combobox 
                                label={"Supplier"}
                            />
                        </div>
                        <div className="p-4 md:p-5 bg-white">
                            
                        </div>
                        <div className="w-full flex items-center justify-end gap-10 mt-7">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className="text-gray-600 bg-transparent font-medium"
                            >
                                Cancel
                            </button>
                            <button 
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
}

export default ListProductBySupplier;
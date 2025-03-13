import { useState } from "react";
import PropTypes from "prop-types";
import icon from '../util/icon'
import ListProductOrder from "./ListProductOrder";
import PageBar from "./PageBar";

const {IoClose} = icon;
const ModalList = ({btn, data}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(1);
    const limit = 4;
    const lastOrderIndex = current * limit;
    const firstOrderIndex = lastOrderIndex - limit;

    const currentOrder = data.slice(firstOrderIndex, lastOrderIndex);
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
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex items-center justify-center">
                                <IoClose className="text-lg"/>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 bg-white">
                            <ListProductOrder data={currentOrder}/>
                            <PageBar currentPage={current} totalPage={Math.ceil(data.length / limit)} 
                            className={"!my-2"} onPageChange={setCurrent}/>
                        </div>
                        <button 
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="capitalize mt-5 text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            {btn}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

ModalList.protoTypes = {
    btn: PropTypes.node.isRequired,
    data: PropTypes.node.isRequired
}

export default ModalList;

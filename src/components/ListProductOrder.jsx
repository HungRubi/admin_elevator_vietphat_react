import ButtonQuantity from "./ButtonQuantity";
import PropTypes from "prop-types";
const ListProductOrder = ({data}) => {
    function format(params) {
        return params.toLocaleString("vi-VN");
    }
    return (
        <ul className="w-full">
            {data?.map((item) => (
                <li key={item._id}
                className="w-full border-b-custom order_items py-5">
                    <div className="w-full flex items-center justify-between ">
                        <div className="flex gap-2.5 items-center w-2/6">
                            <div className="w-[50px] h-[50px] flex items-center justify-center">
                                <input type="checkbox" className="scale-125" value={item._id}/>
                            </div>
                            <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                <img src={item.thumbnail_main} alt={item.name}
                                className='w-full object-cover' />
                            </div>
                            <div className="max-w-[80%]">
                                <h5 className="line-clamp-1 font-medium text-base text-gray-700">
                                    {item.name}
                                </h5>
                                <h5 className="text-sm line-clamp-1 mt-2">
                                    Đơn giá: {item.price}đ
                                </h5>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-500 text-sm leading-0">Quantity: </span> 
                            <ButtonQuantity className={"ml-4"}/>    
                        </div>
                        <div className="flex items-center w-1/7">
                            <span className="text-gray-500 text-sm leading-0">Quantity: </span> 
                            <span className="font-medium ml-2 text-gray-700">{item.category}</span>    
                        </div>
                        <div className="flex justify-end items-center gap-2.5 leading-0 w-1/8">
                            <h6 className='line-through text-[17px] text-[#888]'>
                                {format(item.price)}đ
                            </h6>
                            <h6 className='text-[25px] text-[#2f904b] font-medium'>
                                {format(item.price)}đ
                            </h6>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

ListProductOrder.protoTypes = {
    data: PropTypes.node.isRequired,
}

export default ListProductOrder
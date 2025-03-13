import { NavLink } from 'react-router-dom';
import  {StatusIcon, CircleButton, Search, Button } from '../../components';
import icon from '../../util/icon';

const { PiDotsThreeBold, MdAutoFixHigh, RiDeleteBin6Line, FaStar, FaPause, IoClose} = icon;

const Dashboard = () => {
    return (
        <div className="full py-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-1/2">
                    <div className="w-full">
                        <h2 className="text-[35px] font-[600]">Dashboard</h2>
                        <h5 className="text-[12px] text-[#6d6c6c]">Your Recent Website Overview Report</h5>
                    </div>
                    <div className="w-full mt-10 flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            <StatusIcon>
                                <CircleButton className={"!bg-[#D9FBD0] border-3 border-[#f3f3f3] absolute left-3.5 bottom-3.5"}>
                                    <FaStar className='text-[#25B003] -trans_icon_status'/>
                                </CircleButton>
                            </StatusIcon>
                            <div className='text-[24px] text-color leading-5'>
                                <h5 className='font-[600]'>18 new orders</h5>
                                <span className='sub_text'>Awating processing</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <StatusIcon className="!bg-[#FFCC85]">
                                <CircleButton className={"!bg-[#FFEFCA] border-3 border-[#f3f3f3] absolute left-3.5 bottom-3.5"}>
                                    <FaPause className='text-[#E5780B] -trans_icon_status'/>
                                </CircleButton>
                            </StatusIcon>
                            <div className='text-[24px] text-color leading-5'>
                                <h5 className='font-[600]'>04 orders</h5>
                                <span className='sub_text'>On hold</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <StatusIcon className="!bg-[#F48270]">
                                <CircleButton className={"!bg-[#FFE0DB] border-3 border-[#f3f3f3] absolute left-3.5 bottom-3.5"}>
                                    <IoClose className='text-[#FA3B1D] -trans_icon_status text-[20px]'/>
                                </CircleButton>
                            </StatusIcon>
                            <div className='text-[24px] text-color leading-5'>
                                <h5 className='font-[600]'>2002 orders</h5>
                                <span className='sub_text'>Out of stock</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">

                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="w-full flex items-center justify-between py-8">
                    <div className="text-[19px] text-color leading-6">
                        <h5 className='font-[600]'>Latest reviews</h5>
                        <span className='text-[12px] text-[#888]'>
                            Payment received across all channels
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-1/2 gap-3">
                        <div className="w-1/2">
                            <Search className={"!rounded-[5px]"}/>
                        </div>
                        <Button>All reviews</Button>
                        <Button className={"!px-3"}>
                            <PiDotsThreeBold className='text-[20px]'/>
                        </Button>
                    </div>
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-2 py-3">
                                    <input type="checkbox" className='scale-120'/>
                                </th>
                                <th scope="col" class="py-3"></th>
                                <th scope="col" class="px-4 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Customer
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Rating
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Review
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    Status
                                </th>
                                <th scope="col" class="py-3 text-center">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                <td class="px-2 py-4 w-[15px]">
                                    <input type="checkbox" className='scale-120'/>
                                </td>
                                <td class="py-4 w-1/12 ">
                                    <div className="w-full flex justify-center">
                                        <img src="/img/product/1.png" alt="ảnh sản phẩm" 
                                        className='w-[70px] h-[70px] rounded-[5px] border-custom'/>
                                    </div>
                                </td>
                                <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-2/14">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-4 py-4 w-2/14">
                                    <div className="flex items-center gap-2.5">
                                        <CircleButton>
                                            <img src="/img/default/default.png" alt="ảnh sản phẩm" 
                                            className='w-full object-cover rounded-[50%]'/>
                                        </CircleButton>
                                        <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                            Nguyen Huy Hung
                                        </h5>
                                    </div>
                                </td>
                                <td class="px-4 py-4 w-1/12">
                                    <div className="flex items-center gap-1">
                                        <FaStar className='text-[12px] text-[#FEC107]'/>
                                        <FaStar className='text-[12px] text-[#FEC107]'/>
                                        <FaStar className='text-[12px] text-[#FEC107]'/>
                                        <FaStar className='text-[12px] text-[#FEC107]'/>
                                        <FaStar className='text-[12px] text-[#FEC107]'/>
                                    </div>
                                </td>
                                <td class="px-4 py-4 w-1/12">
                                    ₫ 3.600.000
                                </td>
                                <td class="px-4 py-4 w-3/12 text-justify">
                                    This Fitbit is fantastic! I was trying to be in better shape and needed some motivation, 
                                    so I decided to treat myself to a new Fitbit.
                                </td>
                                <td class="px-4 py-4 w-1/12">
                                    <Button className={"!border-[#90d67f] !py-[2px] bg-[#d9fbd0]"}>
                                        Approved
                                    </Button>
                                </td>
                                <td class="py-4 w-2/12 text-center">
                                <span className='time_text'>18/04/2002</span>
                                    <div className="option items-center justify-center gap-3 hidden w-[100px] m-auto">
                                        <NavLink>
                                            <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                <MdAutoFixHigh className='text-[18px]'/>
                                            </Button>
                                        </NavLink>
                                        <NavLink>
                                            <Button className={"!py-2 !px-2 hover:bg-red-500 hover:text-white"}>
                                                <RiDeleteBin6Line className='text-[18px]'/>
                                            </Button>
                                        </NavLink>
                                        <NavLink>
                                            <Button className={"!py-2 !px-2 hover:bg-blue-500 hover:text-white"}>
                                                <PiDotsThreeBold className='text-[18px]'/>
                                            </Button>
                                        </NavLink>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
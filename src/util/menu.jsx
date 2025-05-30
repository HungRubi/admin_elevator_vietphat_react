import icon from './icon';

const {
    IoHomeOutline, LuUser, BsBox, BsBarChart, 
    IoSettingsOutline, FaSortDown,TbCategory, AiOutlineTool, 
    IoImageOutline, HiOutlineShoppingBag, BsTag,FaRegBell,HiOutlineDocumentCheck,
    HiOutlineNewspaper, BiVideo, MdOutlineWarehouse,MdBusiness,LuReceiptText,
} = icon;

export const menu = [
    {
        text: 'dashboard',
        icon: <IoHomeOutline className='text-[18px] text-color'/>,
        path: ''
    },
    {
        text: 'user',
        icon: <LuUser className='text-[18px] text-color'/>,
        path: '/user'
    },
    {
        text: 'product',
        icon: <BsBox className='text-[18px] text-color'/>,
        path: '/product'
    },
    {
        text: 'receipt',
        icon: <LuReceiptText className='text-[18px] text-color'/>,
        path: '/receipt',
    },
    {       
        text: 'order',
        icon: <HiOutlineShoppingBag className='text-[18px] text-color'/>,
        path: '/order'
    },
    {       
        text: 'warranty',
        icon: <HiOutlineDocumentCheck className='text-[18px] text-color'/>,
        path: '/warranty'
    },
    {
        text: 'article',
        icon: <HiOutlineNewspaper className='text-[18px] text-color'/>,
        path: '/article'
    },
    {
        text: 'report',
        icon: <BsBarChart className='text-[18px] text-color'/>,
        path: '/report'
    },
    {
        text: 'setting',
        icon: <IoSettingsOutline className='text-[18px] text-color'/>,
        path: '/setting'
    },
    {
        text: 'warehouse',
        icon: <MdOutlineWarehouse className='text-[18px] text-color'/>,
        path: '/warehouse',
    },
    {
        text: 'category',
        icon: <TbCategory className='text-[18px] text-color'/>,
        path: '/category/product',
        icon2: <FaSortDown className='text-[18px] text-color mb-1'/>,
        Children: [
            {
                text: 'supplier',
                icon: <MdBusiness className='text-[18px] text-color'/>,
                path: '/category/supplier',
            },
            {
                text: 'product',
                icon: <AiOutlineTool className='text-[18px] text-color'/>,
                path: '/category/product',
            },
            
            {
                text: 'discount',
                icon: <BsTag className='text-[18px] text-color'/>,
                path: '/category/discount',
            },
            {
                text: 'banner',
                icon: <IoImageOutline className='text-[18px] text-color'/>,
                path: '/category/banner',
            },
            {
                text: 'Video',
                icon: <BiVideo className='text-[19px] text-color'/>,
                path: '/category/video',
            },
            {
                text: 'notification',
                icon: <FaRegBell className='text-[18px] text-color'/>,
                path: '/category/notification',
            },
        ]
    },
]


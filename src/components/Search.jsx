import PropTypes from 'prop-types';
import icon from '../util/icon';
const {FiSearch} = icon;

const Search = ({className, placeholder}) => {
    return (
        <form action="" method="get" className='relative w-full'>
            <input type="text" name='search' placeholder={placeholder || 'Enter name product'}
            className={`w-full py-2.5 pl-8.5 pr-5 border-custom rounded-[20px] text-[15px] leading-0 ${className}`}/>
            <button className='absolute left-1 top-[50%] -translate-y-1/2 flex items-center justify-center w-[30px]'>
                <FiSearch className='size-[24px] text-[#888]'/>
            </button>
        </form>
    )
}

Search.protoTypes = {
    className: PropTypes.node.isRequired
}

export default Search
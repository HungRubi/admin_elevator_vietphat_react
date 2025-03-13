import { Button } from '../components/index';
import icons from '../util/icon';
import PropTypes from 'prop-types';

const {AiOutlineLeft, AiOutlineRight} = icons

const PageBar = ({ currentPage, totalPage, onPageChange, className }) => {
    return (
        <div className={`flex items-center justify-center my-10 ${className}`}>
            <Button type="button" className="bg-transparent !border-none" disabled={currentPage === 1}>
                <div
                onClick={() => onPageChange(currentPage - 1)} 
                className="w-[33px] h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center">
                    <AiOutlineLeft className='text-[12px]'/>
                </div>
            </Button>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                <Button type="button" key={page} className="bg-transparent !border-none">
                    <div
                    onClick={() => onPageChange(page)}
                    className={`w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center ${currentPage === page ? 'bg-[#2f904b] text-white' : 'text-[#393939]'}`}>
                        {page}
                    </div>
                </Button>
            ))}
            <Button type="button" className="bg-transparent !border-none" disabled={currentPage === totalPage}>
                <div
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center ${currentPage === totalPage ? 'text-gray-400 cursor-not-allowed' : 'text-[#393939]'}`}
                >
                    <AiOutlineRight className='text-[12px]' />
                </div>
            </Button>
            <Button type="button" className="bg-transparent !border-none">
                <div 
                className="w-auto h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center px-2.5 capitalize">
                    Page {currentPage}/{totalPage}
                </div>
            </Button>
        </div>
    )
}

PageBar.propTypes = {
    currentPage: PropTypes.node.isRequired,
    totalPage: PropTypes.node.isRequired,
    onPageChange: PropTypes.node.isRequired,
}
export default PageBar
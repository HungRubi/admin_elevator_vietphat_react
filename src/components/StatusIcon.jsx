import PropTypes from "prop-types"
import { CircleButton } from './index'

const DataCard = ({children, className}) => {
    return (
        <div className={`w-8 h-8 trans_icon_status bg-[#90D67F] rounded-[6px] relative ${className}`}>
            {children}
        </div>
    )
}

DataCard.protoTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired
}

export default DataCard
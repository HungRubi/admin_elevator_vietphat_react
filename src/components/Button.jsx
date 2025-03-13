import PropTypes from "prop-types"

const Button = ({className, children, type}) => {
    return (
        <button type={type}
        className={`py-2.5 px-3.5 flex items-center justify-center border-custom rounded-[5px] cursor-pointer transition duration-300 ease-linear ${className}`}>
            {children}
        </button>
    )
}

Button.protoTypes = {
    className: PropTypes.node.isRequired,
    type: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
}

export default Button
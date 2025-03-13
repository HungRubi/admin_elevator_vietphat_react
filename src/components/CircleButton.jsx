import PropTypes from "prop-types";

const CircleButton = ({children, className}) => {
    return (
        <div className={`w-10 h-10 flex items-center justify-center bg-circle rounded-[50%] cursor-pointer ${className}`}>
            {children}
        </div>
    )
}

CircleButton.protoTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired
}

export default CircleButton
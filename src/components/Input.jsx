import PropTypes from "prop-types"

const Input = ({className, placeholder, label, type, name, value}) => {
    return (
        <div className="mt-5">
            <label htmlFor="price" className="block text-[16px] font-medium text-gray-800">
                {label}
            </label>
            <div className="mt-2">
                <input type={type || "text"} placeholder={placeholder} required name={name} value={value} id="price"
                className={`focus:ring-blue-500 focus:border-blue-500 block grow py-1.5 px-3 text-base text-gray-900 placeholder:text-gray-400 border-custom w-2/3 rounded-lg ${className}`}/>
            </div>
        </div>
        
    )
}

Input.protoTypes = {
    className: PropTypes.node.isRequired,
    name: PropTypes.node.isRequired,
    placeholder: PropTypes.node.isRequired,
    label: PropTypes.node.isRequired,
    type: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
}

export default Input
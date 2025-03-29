import PropTypes from "prop-types";

const Combobox = ({ data, label, name, selected, defaultValue, onChange, className }) => {
    return (
        <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <select 
            defaultValue={defaultValue || "--- Choise ---"} 
            value={selected} 
            onChange={onChange}
            className={`w-2/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`} 
            aria-label="Default select example" 
            name={name}>
                <option value="">--- Choice ---</option>
                {data.map((item, index) => (
                    <option key={index} value={item.id}>{item.text}</option>
                ))}
            </select>
        </div>
    )
}

Combobox.protoTypes = {
    defaultValue: PropTypes.node.isRequired,
    data: PropTypes.node.isRequired,
    label: PropTypes.node.isRequired,
    name: PropTypes.node.isRequired,
    selected: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.node.isRequired,
}

export default Combobox
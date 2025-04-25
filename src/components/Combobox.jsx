import PropTypes from "prop-types";

const Combobox = ({ data, label, name, selected, onChange, className }) => {
    const handleChange = (e) => {
        const selectedItem = data.find(item => item.id === e.target.value);
        onChange(e, selectedItem);
    }

    return (
        <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <select 
                value={selected || ""} 
                onChange={handleChange}
                className={`w-2/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`} 
                aria-label="Default select example" 
                name={name}
            >
                <option value="">--- Choice ---</option>
                {data.map((item, index) => (
                    <option key={index} value={item.id || item._id}>{item.text || item.name || item.title}</option>
                ))}
            </select>
        </div>
    )
}

Combobox.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default Combobox
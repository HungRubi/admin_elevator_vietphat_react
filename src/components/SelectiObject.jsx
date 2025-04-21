import PropTypes from "prop-types";
import Select from "react-select";
import { useState } from "react";
const SelectiObject = ({ data, onSelectedUser }) => {
    const [selected, setSelected] = useState(null);
    const customOptions = data.map(item => ({
        value: item._id,
        name: item.name,
        phone: item.phone,
        address: item.address,
        label: (
            <div className="flex items-center gap-2.5">
                <img src={item.avatar} alt={item.name} className="w-6 h-6 rounded-full" />
                <span>{item.name}</span>
            </div>
        )
    }));
    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: "3px 4px", // Tương đương py-1.5 px-3
            borderRadius: "8px", // Bo góc
        }),
    };
    return (
        <div className="mt-5">
            <Select 
                className="w-2/3 "
                options={customOptions} 
                value={customOptions.find(option => option.value === selected)}
                onChange={(selectedOption) => {
                    setSelected(selectedOption.value);
                    onSelectedUser(selectedOption);
                }}
                menuIsOpen={undefined}
                styles={customStyles}
            />
        </div>
    )
}

SelectiObject.protoTypes = {
    data: PropTypes.node.isRequired,
    onSelectedUser: PropTypes.func
}

export default SelectiObject
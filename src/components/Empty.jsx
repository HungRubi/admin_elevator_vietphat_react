import PropTypes from "prop-types"

const Empty = ({title, subTitle}) => {
    return (
        <tr>
            <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <span className="text-xl">∅</span>
                    </div>
                    <p className="mt-3 text-lg font-medium text-slate-700">{title}</p>
                    <p className="mt-1 text-sm text-slate-500">{subTitle}</p>
                </div>
            </td>
        </tr>
    )
}

Empty.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired
}

export default Empty
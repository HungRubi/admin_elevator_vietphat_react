import PropTypes from "prop-types"

const Empty = ({title, subTitle}) => {
    return (
        <tr>
            <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-lg font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{subTitle}</p>
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
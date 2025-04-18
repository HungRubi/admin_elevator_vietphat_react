import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const PageTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title} | Admin Elevator Vietphat</title>
        </Helmet>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default PageTitle; 
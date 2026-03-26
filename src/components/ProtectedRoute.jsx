import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { currentUser, accessToken } = useSelector((state) => state.auth);
    if (!accessToken) {
        return <Navigate to={"/login"} replace />;
    }
    /* Chờ restoreSession (GET /auth/me) khi có token nhưng chưa có user */
    if (!currentUser?._id) {
        return null;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
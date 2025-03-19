import PropTypes from "prop-types"
import { useEffect } from "react"
import * as actions from "../store/actions"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ToastFormat = ({message, url, messSuccess, messError}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(message)
        if(message === "Thành công"){
            toast.success(messSuccess);
            setTimeout(() => {
                navigate(url);
                dispatch(actions.resetMessage());
            }, 1500)
        }
        if(message === "Thất bại"){
            toast.error(messError);
            dispatch(actions.resetMessage());
        }
    }, [message, navigate,dispatch,url,messSuccess,messError])
    return null
}

ToastFormat.protoTypes = {
    message: PropTypes.string,
    url: PropTypes.string.isRequired,
    messSuccess: PropTypes.string.isRequired,
    messError: PropTypes.string.isRequired,
}

export default ToastFormat
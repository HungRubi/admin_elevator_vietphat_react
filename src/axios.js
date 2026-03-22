import axios from "axios";

const instance = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL
})
let accessToken = null;
let isRefreshing = false;
let refreshSubscribers = [];
let onTokenRefreshedHandler = null;
let onAuthFailedHandler = null;

export const setAccessToken = (token) => {
    accessToken = token || null;
};

export const clearAccessToken = () => {
    accessToken = null;
};

export const setAuthEventHandlers = ({ onTokenRefreshed, onAuthFailed } = {}) => {
    onTokenRefreshedHandler = onTokenRefreshed || null;
    onAuthFailedHandler = onAuthFailed || null;
};

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const notifyTokenRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

instance.interceptors.request.use(
    function (config) {
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error?.config;
        const status = error?.response?.status;
        const requestUrl = originalRequest?.url || "";

        const isAuthEndpoint =
            requestUrl.includes("/auth/login") ||
            requestUrl.includes("/auth/refresh") ||
            requestUrl.includes("/auth/logout");

        if (status !== 401 || !originalRequest || originalRequest._retry || isAuthEndpoint) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve) => {
                subscribeTokenRefresh((newToken) => {
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    resolve(instance(originalRequest));
                });
            });
        }

        isRefreshing = true;

        try {
            const refreshResponse = await axios({
                url: `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
                method: "post",
                withCredentials: true,
            });

            const newToken = refreshResponse?.data?.accessToken;
            if (!newToken) {
                throw new Error("Refresh token response missing accessToken");
            }

            setAccessToken(newToken);
            if (onTokenRefreshedHandler) {
                onTokenRefreshedHandler(newToken);
            }

            notifyTokenRefreshed(newToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
        } catch (refreshError) {
            clearAccessToken();
            refreshSubscribers = [];
            if (onAuthFailedHandler) {
                onAuthFailedHandler();
            }
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);
export default instance
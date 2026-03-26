import { request } from "../request";

const toQueryString = (params = {}) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") return;
        sp.set(k, String(v));
    });
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
};

/** Staff: GET /comment/all (có meta phân trang + search theo tên sản phẩm). */
export const getComment = async (search = "", options = {}) => {
    return request({
        url: `/comment/all${toQueryString({
            timkiem: search,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            comment: options.comment, // legacy sort: comment=asc/desc
        })}`,
        method: "GET",
    });
};

/** Staff: GET /comment/filter (filter star/date + search message + meta phân trang). */
export const filterComment = async (query, value, query2, value2, options = {}) => {
    return request({
        url: `/comment/filter${toQueryString({
            [query]: value,
            ...(query2 ? { [query2]: value2 } : {}),
            timkiem: options.timkiem,
            q: options.q,
            page: options.page,
            offset: options.offset,
            limit: options.limit,
            sort: options.sort,
            order: options.order,
            comment: options.comment,
        })}`,
        method: "GET",
    });
};
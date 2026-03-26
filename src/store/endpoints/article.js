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

/**
 * Staff/Admin list (mọi status) - tương thích hành vi cũ:
 * - nếu truyền `search` (string) -> map sang `timkiem`
 * - mặc định `limit=100` để UI hiện tại vẫn phân trang phía client (không đổi giao diện)
 */
export const getArticle = async (search = "", options = {}) => {
    const qs = toQueryString({
        timkiem: search,
        limit: options.limit ?? 100,
        page: options.page,
        offset: options.offset,
        sort: options.sort,
        order: options.order,
        article: options.article, // legacy: article=desc
    });
    return request({
        url: `/articles/admin${qs}`,
        method: "get",
    });
};

export const getArticlesPublic = async (options = {}) => {
    const qs = toQueryString({
        q: options.q,
        timkiem: options.timkiem,
        limit: options.limit ?? 100,
        page: options.page,
        offset: options.offset,
        sort: options.sort,
        order: options.order,
    });
    return request({
        url: `/articles/${qs}`,
        method: "get",
    });
};

export const getArticleDetail = async (id) => {
    return request({
        url: `/articles/${id}`,
        method: 'get'
    });
}

export const createArticle = async (data) => {
    return request({
        url: `/articles/store`,
        method: 'POST',
        data
    });
}

export const deleteArticle = async (id) => {
    return request({
        url: `/articles/${id}`,
        method: 'DELETE',
    });
}

export const updateArticle = async (id, data) => {
    return request({
        url: `/articles/${id}`,
        method: 'PUT',
        data
    });
}

/**
 * Staff filter - giữ API cũ của frontend (2 cặp query) nhưng backend mới hỗ trợ thêm
 * sort/order/page/offset/limit và timkiem/q.
 */
export const filterArticle = async (query, value, query2, value2, options = {}) => {
    const qs = toQueryString({
        [query]: value,
        ...(query2 ? { [query2]: value2 } : {}),
        timkiem: options.timkiem,
        q: options.q,
        limit: options.limit ?? 100,
        page: options.page,
        offset: options.offset,
        sort: options.sort,
        order: options.order,
        article: options.article,
    });
    return request({
        url: `/articles/filter${qs}`,
        method: "GET",
    });
};
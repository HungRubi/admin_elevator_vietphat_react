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

export const getWarranty = async (search = "", options = {}) => {
  return request({
    method: "GET",
    url: `/warranty${toQueryString({
      timkiem: search,
      q: options.q,
      page: options.page,
      offset: options.offset,
      limit: options.limit,
      sort: options.sort,
      order: options.order,
      warranty: options.warranty, // legacy: warranty=asc/desc
    })}`,
  });
};

export const getDetail = async (id) => {
  return request({
    method: "GET",
    url: `/warranty/${id}`,
  });
};

export const updateWarranty = async (id, data) => {
  return request({
    method: "PUT",
    url: `/warranty/${id}`,
    data,
  });
};

/** Đơn Thành công — listQuery, mặc định server limit 30 */
export const getAdd = async (options = {}) => {
  return request({
    method: "GET",
    url: `/warranty/add${toQueryString({
      page: options.page,
      offset: options.offset,
      limit: options.limit,
      sort: options.sort,
      order: options.order,
      timkiem: options.timkiem,
      q: options.q,
    })}`,
  });
};

export const addWarranty = async (data) => {
  return request({
    method: "POST",
    url: "/warranty/store",
    data,
  });
};

export const deleteWarranty = async (id) => {
  return request({
    method: "DELETE",
    url: `/warranty/${id}`,
  });
};

export const filterWarranty = async (query, value, query2, value2, extra = {}) => {
  return request({
    method: "GET",
    url: `/warranty/filter${toQueryString({
      [query]: value,
      ...(query2 ? { [query2]: value2 } : {}),
      timkiem: extra.timkiem,
      q: extra.q,
      page: extra.page,
      offset: extra.offset,
      limit: extra.limit,
      sort: extra.sort,
      order: extra.order,
      warranty: extra.warranty,
    })}`,
  });
};

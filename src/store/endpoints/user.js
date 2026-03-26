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

export const getUser = async (search = "", options = {}) => {
  return request({
    url: `/user${toQueryString({
      timkiem: search,
      q: options.q,
      page: options.page,
      offset: options.offset,
      limit: options.limit,
      sort: options.sort,
      order: options.order,
      user: options.user, // legacy: user=asc/desc
    })}`,
    method: "GET",
  });
};

export const getUserDetail = async (id) => {
  return request({
    url: `/user/${id}`,
    method: "GET",
  });
};

export const createUser = async (data) => {
  return request({
    url: `/user/store`,
    method: "POST",
    data,
  });
};

export const deleteUser = async (id) => {
  return request({
    url: `/user/${id}`,
    method: "DELETE",
  });
};

/** @deprecated dùng deleteUser */
export const deleleUser = deleteUser;

/**
 * CMS: cập nhật hồ sơ (không mass-assign address-only).
 * Server: PUT /profile/update/:id
 */
export const updateUser = async (id, data) => {
  return request({
    url: `/user/profile/update/${id}`,
    method: "PUT",
    data,
  });
};

/** Chỉ field address (trim phía server). */
export const updateUserAddress = async (id, data) => {
  const body =
    data && typeof data === "object" && "address" in data
      ? { address: data.address }
      : data;
  return request({
    url: `/user/update/address/${id}`,
    method: "PUT",
    data: body,
  });
};

export const filterUser = async (query, value, query2, value2, extra = {}) => {
  return request({
    url: `/user/filter${toQueryString({
      [query]: value,
      ...(query2 ? { [query2]: value2 } : {}),
      timkiem: extra.timkiem,
      q: extra.q,
      page: extra.page,
      offset: extra.offset,
      limit: extra.limit,
      sort: extra.sort,
      order: extra.order,
      user: extra.user,
    })}`,
    method: "GET",
  });
};

/** GET /user/order/:id — staff, listQuery + sort đơn hàng */
export const getUserOrders = async (id, options = {}) => {
  return request({
    url: `/user/order/${id}${toQueryString({
      page: options.page,
      offset: options.offset,
      limit: options.limit,
      sort: options.sort,
      order: options.order,
      timkiem: options.timkiem,
      q: options.q,
    })}`,
    method: "GET",
  });
};

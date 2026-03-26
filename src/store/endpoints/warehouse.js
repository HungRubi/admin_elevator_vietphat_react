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

export const getWarehouse = async (search = "", options = {}) => {
  return request({
    method: "GET",
    url: `/warehouse${toQueryString({
      timkiem: search,
      q: options.q,
      page: options.page,
      offset: options.offset,
      limit: options.limit,
      sort: options.sort,
      order: options.order,
      warehouse: options.warehouse, // legacy: warehouse=asc/desc
    })}`,
  });
};

export const deleteWarehouse = async (id) => {
  return request({
    method: "DELETE",
    url: `/warehouse/${id}`,
  });
};

export const filterWarehouse = async (query, value, query2, value2, extra = {}) => {
  return request({
    method: "GET",
    url: `/warehouse/filter${toQueryString({
      [query]: value,
      ...(query2 ? { [query2]: value2 } : {}),
      timkiem: extra.timkiem,
      q: extra.q,
      page: extra.page,
      offset: extra.offset,
      limit: extra.limit,
      sort: extra.sort,
      order: extra.order,
      warehouse: extra.warehouse,
    })}`,
  });
};

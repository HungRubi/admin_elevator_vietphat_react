import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/order";
import { setMessage } from "./uiSlice";

const unwrap = (res) => (res && typeof res === "object" && "data" in res ? res.data : res) ?? res;

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (payload = "", { rejectWithValue }) => {
    const normalizedPayload =
      typeof payload === "string"
        ? { searchType: payload, options: {} }
        : { searchType: payload?.searchType || "", options: payload?.options || {} };
    const res = await apis.getOrder(normalizedPayload.searchType, normalizedPayload.options);
    if (res.ok) return { data: res.data, searchType: normalizedPayload.searchType };
    return rejectWithValue(res.message || "Lỗi tải đơn hàng");
  }
);

export const getOrderAdd = createAsyncThunk(
  "order/getOrderAdd",
  async (_, { rejectWithValue }) => {
    const res = await apis.getOrderAdd();
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải dữ liệu tạo đơn");
  }
);

export const getOrderDetail = createAsyncThunk(
  "order/getOrderDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getOrderDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết đơn");
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateOrder(data, id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật đơn thất bại");
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.addOrder(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo đơn thất bại");
  }
);

export const filterOrder = createAsyncThunk(
  "order/filterOrder",
  async ({ query, value, query2, value2, options = {} }, { rejectWithValue }) => {
    const res = await apis.filterOrder(query, value, query2, value2, options);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc đơn thất bại");
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteOrder(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa đơn thất bại");
  }
);

const initialState = {
  order: [],
  total: 0,
  page: 1,
  limit: 10,
  offset: 0,
  totalPage: 1,
  searchType: false,
  searchOrder: [],
  orderProduct: [],
  orderDiscount: [],
  orderUser: [],
  productsByOrder: [],
  orderEditProduct: [],
  orderDetail: {},
  discountOrder: {},
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.fulfilled, (state, action) => {
        const d = unwrap(action.payload.data) || {};
        state.order = action.payload.searchType
          ? d?.searchOrder || d?.orderFormat || d?.orders || []
          : d?.orderFormat || d?.orders || d?.searchOrder || [];
        state.searchOrder = d?.searchOrder || [];
        state.total = d?.total || 0;
        state.totalPage = d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
        state.searchType = !!action.payload.searchType;
      })
      .addCase(filterOrder.fulfilled, (state, action) => {
        const d = unwrap(action.payload) || {};
        state.order = d?.orders || d?.orderFormat || d?.searchOrder || [];
        state.total = d?.total || 0;
        state.totalPage = d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
      })
      .addCase(getOrderAdd.fulfilled, (state, action) => {
        state.orderProduct = action.payload?.data?.products || [];
        state.orderDiscount = action.payload?.data?.discounts || [];
        state.orderUser = action.payload?.data?.users || [];
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderEditProduct = action.payload?.data?.orderDetailsFormat || [];
        state.orderDetail = action.payload?.data?.orders || {};
        state.discountOrder = action.payload?.data?.discount || {};
      });
  },
});

export default orderSlice.reducer;


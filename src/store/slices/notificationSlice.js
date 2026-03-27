import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/notification";
import { setMessage } from "./uiSlice";

export const getNotification = createAsyncThunk(
  "notification/getNotification",
  async (payload = "", { rejectWithValue }) => {
    const normalizedPayload =
      typeof payload === "string"
        ? { search: payload, options: {} }
        : { search: payload?.search || "", options: payload?.options || {} };
    const res = await apis.getNotification(normalizedPayload.search, normalizedPayload.options);
    if (res.ok) return { res: res.data, search: normalizedPayload.search };
    return rejectWithValue(res.message || "Lỗi tải thông báo");
  }
);

export const editNotification = createAsyncThunk(
  "notification/editNotification",
  async (id, { rejectWithValue }) => {
    const res = await apis.editNotification(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết thông báo");
  }
);

export const addNotification = createAsyncThunk(
  "notification/addNotification",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.addNotification(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Thêm thông báo thất bại");
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteNotification(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa thông báo thất bại");
  }
);

export const filterNotification = createAsyncThunk(
  "notification/filterNotification",
  async ({ query, value, query2, value2, options = {} }, { rejectWithValue }) => {
    const res = await apis.filterNotification({
      [query]: value,
      ...(query2 ? { [query2]: value2 } : {}),
      timkiem: options.timkiem,
      q: options.q,
      page: options.page,
      offset: options.offset,
      limit: options.limit,
      sort: options.sort,
      order: options.order,
      notification: options.notification,
    });
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc thông báo thất bại");
  }
);

const initialState = {
  notificaiton: [],
  notificaitonDetails: {},
  total: 0,
  page: 1,
  limit: 10,
  offset: 0,
  currentNotification: null,
  sortNotification: null,
  currentSort: null,
  currentOrder: null,
  totalPage: 1,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotification.fulfilled, (state, action) => {
        const d = action.payload.res;
        const list = action.payload.search
          ? d?.searchNotification || d?.notifications || []
          : d?.notifications || [];

        state.notificaiton = list;
        state.total = d?.total || 0;
        state.totalPage = d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
        state.currentNotification = d?.currentNotification ?? null;
        state.sortNotification = d?.sortNotification ?? d?.currentNotification ?? null;
        state.currentSort = d?.currentSort ?? null;
        state.currentOrder = d?.currentOrder ?? null;
      })
      .addCase(filterNotification.fulfilled, (state, action) => {
        const d = action.payload;
        state.notificaiton = d?.notifications || [];
        state.total = d?.total || 0;
        state.totalPage = d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
        state.currentNotification = d?.currentNotification ?? null;
        state.sortNotification = d?.sortNotification ?? d?.currentNotification ?? null;
        state.currentSort = d?.currentSort ?? null;
        state.currentOrder = d?.currentOrder ?? null;
      })
      .addCase(editNotification.fulfilled, (state, action) => {
        state.notificaitonDetails = action.payload?.notification || {};
      });
  },
});

export default notificationSlice.reducer;


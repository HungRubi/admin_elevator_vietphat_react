import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/receipt";
import { setMessage } from "./uiSlice";

const unwrap = (res) => (res && typeof res === "object" && "data" in res ? res.data : res) ?? res;

const normalizeList = (res, search) => {
  const d = unwrap(res) || {};
  const list = search
    ? d.receiptSearch ?? d.searchReceipt ?? d.receipts ?? []
    : d.receipts ?? [];
  return {
    receipts: list,
    total: d.total ?? 0,
    totalPage: d.totalPage ?? d.totalPages ?? 1,
    page: d.page ?? 1,
    limit: d.limit ?? 10,
    offset: d.offset ?? 0,
  };
};

export const getReceipt = createAsyncThunk(
  "receipt/getReceipt",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getReceipt(search);
    if (res.ok) return { res: res.data, search };
    return rejectWithValue(res.message || "Lỗi tải phiếu nhập");
  }
);

export const addReceipt = createAsyncThunk(
  "receipt/addReceipt",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.addReceipt(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Thêm phiếu nhập thất bại");
  }
);

export const getDetailReceipt = createAsyncThunk(
  "receipt/getDetailReceipt",
  async (id, { rejectWithValue }) => {
    const res = await apis.getDetailReceipt(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết phiếu nhập");
  }
);

export const updateReceipt = createAsyncThunk(
  "receipt/updateReceipt",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateReceipt(id, data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật phiếu nhập thất bại");
  }
);

export const deleteReceipt = createAsyncThunk(
  "receipt/deleteReceipt",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteReceipt(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa phiếu nhập thất bại");
  }
);

export const filterReceipt = createAsyncThunk(
  "receipt/filterReceipt",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterReceipt(query, value, query2, value2);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc phiếu nhập thất bại");
  }
);

const initialState = {
  receipts: [],
  total: 0,
  page: 1,
  limit: 10,
  offset: 0,
  totalPage: 1,
  receipt: {},
  receiptDetail: [],
  error: null,
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReceipt.fulfilled, (state, action) => {
        const n = normalizeList(action.payload.res, action.payload.search);
        state.receipts = n.receipts || [];
        state.total = n.total;
        state.totalPage = n.totalPage || 1;
        state.page = n.page;
        state.limit = n.limit;
        state.offset = n.offset;
      })
      .addCase(getReceipt.rejected, (state, action) => {
        state.error = action.payload || null;
        state.receipts = [];
        state.total = 0;
        state.totalPage = 1;
        state.page = 1;
        state.limit = 10;
        state.offset = 0;
      })
      .addCase(filterReceipt.fulfilled, (state, action) => {
        const d = unwrap(action.payload) || {};
        state.receipts = d.receipts || [];
        state.total = d.total ?? 0;
        state.totalPage = d.totalPage ?? d.totalPages ?? 1;
        state.page = d.page ?? 1;
        state.limit = d.limit ?? 10;
        state.offset = d.offset ?? 0;
      })
      .addCase(getDetailReceipt.fulfilled, (state, action) => {
        state.receipt = action.payload?.receipt || {};
        state.receiptDetail = action.payload?.receiptDetails || [];
      });
  },
});

export default receiptSlice.reducer;


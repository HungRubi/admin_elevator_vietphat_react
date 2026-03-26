import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/warranty";
import { setMessage } from "./uiSlice";

const unwrap = (body) => body?.data ?? body;

const applyListMeta = (state, d) => {
  const row = d || {};
  state.totalPage = row.totalPages ?? row.totalPage ?? 1;
  state.total = row.total ?? 0;
  state.page = row.page ?? 1;
  state.listLimit = row.limit ?? 10;
  state.offset = row.offset ?? 0;
  state.searchType = !!row.searchType;
  state.currentSort = row.currentSort ?? null;
  state.currentWarranty = row.currentWarranty ?? null;
};

export const getWarranty = createAsyncThunk(
  "warranty/getWarranty",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getWarranty(search, { limit: 100 });
    if (res.ok) return { res: res.data, search };
    return rejectWithValue(res.message || "Lỗi tải bảo hành");
  }
);

export const getDetail = createAsyncThunk(
  "warranty/getDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết bảo hành");
  }
);

export const updateWarranty = createAsyncThunk(
  "warranty/updateWarranty",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateWarranty(id, data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật bảo hành thất bại");
  }
);

export const getAdd = createAsyncThunk(
  "warranty/getAdd",
  async (_, { rejectWithValue }) => {
    const res = await apis.getAdd({ limit: 100 });
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải dữ liệu thêm bảo hành");
  }
);

export const addWarranty = createAsyncThunk(
  "warranty/addWarranty",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.addWarranty(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Thêm bảo hành thất bại");
  }
);

export const deleteWarranty = createAsyncThunk(
  "warranty/deleteWarranty",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteWarranty(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa bảo hành thất bại");
  }
);

export const filterWarranty = createAsyncThunk(
  "warranty/filterWarranty",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterWarranty(query, value, query2, value2, {
      limit: 100,
    });
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc bảo hành thất bại");
  }
);

const initialState = {
  warranties: [],
  totalPage: 1,
  total: 0,
  page: 1,
  listLimit: 10,
  offset: 0,
  searchType: false,
  currentSort: null,
  currentWarranty: null,
  warranty: {},
  ordersByWarranty: [],
  ordersAddTotalPage: 1,
  ordersAddTotal: 0,
  error: null,
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWarranty.fulfilled, (state, action) => {
        const d = unwrap(action.payload.res) || {};
        state.warranties = action.payload.search
          ? d.searchWarranty || []
          : d.warranties || [];
        applyListMeta(state, d);
      })
      .addCase(filterWarranty.fulfilled, (state, action) => {
        const d = unwrap(action.payload) || {};
        state.warranties = d.warranties || [];
        applyListMeta(state, d);
      })
      .addCase(getAdd.fulfilled, (state, action) => {
        const d = unwrap(action.payload) || {};
        state.ordersByWarranty = d.orders || [];
        state.ordersAddTotalPage = d.totalPages ?? d.totalPage ?? 1;
        state.ordersAddTotal = d.total ?? 0;
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        const p = unwrap(action.payload) || {};
        state.warranty = p.warranty || {};
      });
  },
});

export default warrantySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/supplier";
import { setMessage } from "./uiSlice";

export const getSuppliers = createAsyncThunk(
  "supplier/getSuppliers",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getSuppliers(search, { limit: 100 });
    if (res.ok) return { res, search };
    return rejectWithValue(res.message || "Lỗi tải nhà cung cấp");
  }
);

export const addSupplier = createAsyncThunk(
  "supplier/addSupplier",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.addSupplier(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Thêm nhà cung cấp thất bại");
  }
);

export const getDetails = createAsyncThunk(
  "supplier/getDetails",
  async (id, { rejectWithValue }) => {
    const res = await apis.getDetails(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết nhà cung cấp");
  }
);

export const updateSupplier = createAsyncThunk(
  "supplier/updateSupplier",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    const res = await apis.update(data, id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật nhà cung cấp thất bại");
  }
);

export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteSupplier(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa nhà cung cấp thất bại");
  }
);

export const getProductBySupplier = createAsyncThunk(
  "supplier/getProductBySupplier",
  async (arg, { rejectWithValue }) => {
    let id;
    let opts = { limit: 100 };
    if (typeof arg === "string") {
      id = arg;
    } else if (arg && typeof arg === "object") {
      id = arg.id;
      opts = { ...opts, ...arg };
      delete opts.id;
    }
    if (!id) return rejectWithValue("Thiếu id nhà cung cấp");
    const res = await apis.getProductBySupplier(id, opts);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải sản phẩm theo nhà cung cấp");
  }
);

const initialState = {
  suppliers: [],
  totalPage: 1,
  total: 0,
  page: 1,
  listLimit: 10,
  offset: 0,
  searchType: false,
  currentSort: null,
  currentOrder: null,
  detailSupplier: {},
  productsBySupplier: [],
  productsTotalPage: 1,
  error: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.fulfilled, (state, action) => {
        const raw = action.payload.res?.data;
        const nested = raw?.data ?? raw ?? {};
        state.suppliers =
          nested.supplier ?? nested.searchSupplier ?? [];
        state.totalPage = nested.totalPages ?? nested.totalPage ?? 1;
        state.total = nested.total ?? 0;
        state.page = nested.page ?? 1;
        state.listLimit = nested.limit ?? 10;
        state.offset = nested.offset ?? 0;
        state.searchType = !!nested.searchType;
        state.currentSort = nested.currentSort ?? null;
        state.currentOrder = nested.currentOrder ?? null;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.error = action.payload || null;
        state.suppliers = [];
        state.totalPage = 1;
        state.total = 0;
        state.page = 1;
        state.listLimit = 10;
        state.offset = 0;
        state.searchType = false;
        state.currentSort = null;
        state.currentOrder = null;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        const p = action.payload?.data ?? action.payload;
        state.detailSupplier = p?.supplier || {};
      })
      .addCase(getProductBySupplier.fulfilled, (state, action) => {
        const p = action.payload?.data ?? action.payload ?? {};
        state.productsBySupplier =
          p.products || p.productFormat || [];
        state.productsTotalPage = p.totalPages ?? p.totalPage ?? 1;
      });
  },
});

export default supplierSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/warehouse";
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
  state.currentWarehouse = row.currentWarehouse ?? null;
};

export const getWarehouse = createAsyncThunk(
  "warehouse/getWarehouse",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getWarehouse(search, { limit: 100 });
    if (res.ok) return { res: res.data, search };
    return rejectWithValue(res.message || "Lỗi tải kho");
  }
);

export const deleteWarehouse = createAsyncThunk(
  "warehouse/deleteWarehouse",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteWarehouse(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa kho thất bại");
  }
);

export const filterWarehouse = createAsyncThunk(
  "warehouse/filterWarehouse",
  async ({ query, value, query2, value2 } = {}, { rejectWithValue }) => {
    if (!query) {
      const res = await apis.getWarehouse("", { limit: 100 });
      if (res.ok) return { type: "reset", data: res.data };
      return rejectWithValue(res.message || "Lỗi tải kho");
    }
    const res = await apis.filterWarehouse(query, value, query2, value2, {
      limit: 100,
    });
    if (res.ok) return { type: "filter", data: res.data };
    return rejectWithValue(res.message || "Lọc kho thất bại");
  }
);

const initialState = {
  warehouse: [],
  totalPage: 1,
  total: 0,
  page: 1,
  listLimit: 10,
  offset: 0,
  searchType: false,
  currentSort: null,
  currentWarehouse: null,
  error: null,
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouse.fulfilled, (state, action) => {
        const d = unwrap(action.payload.res) || {};
        state.warehouse = action.payload.search
          ? d.searchWarehouse || []
          : d.warehouses || [];
        applyListMeta(state, d);
      })
      .addCase(filterWarehouse.fulfilled, (state, action) => {
        const d = unwrap(action.payload.data) || {};
        state.warehouse = d.warehouses || [];
        applyListMeta(state, d);
      });
  },
});

export default warehouseSlice.reducer;

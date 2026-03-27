import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/comments";

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (payload = "", { rejectWithValue }) => {
    const normalizedPayload =
      typeof payload === "string"
        ? { search: payload, options: {} }
        : { search: payload?.search || "", options: payload?.options || {} };

    const res = await apis.getComment(normalizedPayload.search, normalizedPayload.options);
    if (res.ok) return { data: res.data, search: normalizedPayload.search };
    return rejectWithValue(res.message || "Lỗi tải comment");
  }
);

export const filterComment = createAsyncThunk(
  "comment/filterComment",
  async ({ query, value, query2, value2, options = {} }, { rejectWithValue }) => {
    const res = await apis.filterComment(query, value, query2, value2, options);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc comment thất bại");
  }
);

const initialState = {
  comment: [],
  searchType: false,
  total: 0,
  page: 1,
  limit: 10,
  offset: 0,
  currentSort: null,
  currentOrder: null,
  totalPage: 1,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComment.fulfilled, (state, action) => {
        const d = action.payload.data;
        state.searchType = !!d?.searchType;
        state.comment = action.payload.search ? d?.searchComment || [] : d?.comment || [];
        state.total = d?.total || 0;
        state.totalPage = d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
        state.currentSort = d?.currentSort || null;
        state.currentOrder = d?.currentOrder || null;
      })
      .addCase(filterComment.fulfilled, (state, action) => {
        const d = action.payload;
        state.searchType = !!d?.searchType;
        state.comment = d?.comment || [];
        state.total = d?.total || 0;
        state.totalPage = d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
        state.currentSort = d?.currentSort || null;
        state.currentOrder = d?.currentOrder || null;
      });
  },
});

export default commentSlice.reducer;


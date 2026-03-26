import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/user";
import { setMessage } from "./uiSlice";
import { setCurrentUser } from "./authSlice";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getUser(search, { limit: 100 });
    if (res.ok) return { data: res.data, search };
    return rejectWithValue(res.message || "Lỗi tải user");
  }
);

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getUserDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết user");
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateUser(id, data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật user thất bại");
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.createUser(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo user thất bại");
  }
);

export const filterUser = createAsyncThunk(
  "user/filterUser",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterUser(query, value, query2, value2);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc user thất bại");
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteUser(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa user thất bại");
  }
);

export const setCurrrentUser = createAsyncThunk("user/setCurrentUser", async (u, { dispatch }) => {
  dispatch(setCurrentUser(u));
  return u;
});

const initialState = {
  user: [],
  totalPage: 1,
  totalUser: 0,
  page: 1,
  listLimit: 10,
  offset: 0,
  searchType: false,
  currentSort: null,
  currentOrder: null,
  detailUser: {},
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        const raw = action.payload.data;
        const d = raw?.data ?? raw ?? {};
        state.user = action.payload.search
          ? d.searchUser || []
          : d.formatUser || [];
        state.totalPage = d.totalPages ?? d.totalPage ?? 1;
        state.totalUser = d.totalUser ?? d.total ?? 0;
        state.page = d.page ?? 1;
        state.listLimit = d.limit ?? 10;
        state.offset = d.offset ?? 0;
        state.searchType = !!d.searchType;
        state.currentSort = d.currentSort ?? null;
        state.currentOrder = d.currentOrder ?? null;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        const p = action.payload?.data ?? action.payload;
        state.detailUser = p?.user ?? p ?? {};
      })
      .addCase(filterUser.fulfilled, (state, action) => {
        const d = action.payload?.data ?? action.payload ?? {};
        state.user = d.formatUser || [];
        state.totalPage = d.totalPages ?? d.totalPage ?? 1;
        state.totalUser = d.totalUser ?? d.total ?? 0;
        state.page = d.page ?? 1;
        state.listLimit = d.limit ?? 10;
        state.offset = d.offset ?? 0;
        state.searchType = !!d.searchType;
        state.currentSort = d.currentSort ?? null;
        state.currentOrder = d.currentOrder ?? null;
      });
  },
});

export default userSlice.reducer;


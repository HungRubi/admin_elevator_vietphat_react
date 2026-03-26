import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/category";
import { setMessage } from "./uiSlice";

const normalize = (res) => {
  const d = res?.data;
  const nested = d?.data || d;
  return {
    list: nested?.formatBanner || [],
    searchList: nested?.searchBanner || [],
    totalPage: nested?.totalPage || 1,
  };
};

export const getCategoryBanner = createAsyncThunk(
  "banner/getCategoryBanner",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getCategoryBanner(search);
    if (res.ok) return { res, search };
    return rejectWithValue(res.message || "Lỗi tải banner");
  }
);

export const getCategoryBannerDetail = createAsyncThunk(
  "banner/getCategoryBannerDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getCategoryBannerDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết banner");
  }
);

export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.createBanner(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo banner thất bại");
  }
);

export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateBanner(id, data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật banner thất bại");
  }
);

export const filterBanner = createAsyncThunk(
  "banner/filterBanner",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterBanner(query, value, query2, value2);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc banner thất bại");
  }
);

const initialState = {
  categoryBanner: [],
  totalPage: 1,
  categoryBannerDetail: {},
  error: null,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryBanner.fulfilled, (state, action) => {
        const { list, searchList, totalPage } = normalize(action.payload.res);
        state.categoryBanner = action.payload.search ? searchList || [] : list || [];
        state.totalPage = totalPage || 1;
      })
      .addCase(getCategoryBanner.rejected, (state, action) => {
        state.error = action.payload || null;
        state.categoryBanner = [];
        state.totalPage = 1;
      })
      .addCase(getCategoryBannerDetail.fulfilled, (state, action) => {
        state.categoryBannerDetail = action.payload?.data?.banner || {};
      })
      .addCase(filterBanner.fulfilled, (state, action) => {
        state.categoryBanner = action.payload?.bannerFormat || [];
        state.totalPage = action.payload?.totalPage || 1;
      });
  },
});

export default bannerSlice.reducer;


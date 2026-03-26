import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/category";
import { setMessage } from "./uiSlice";

const normalize = (res) => {
  const d = res?.data;
  const nested = d?.data || d;
  return {
    list: nested?.categoryVideo || [],
    searchList: nested?.searchVideo || [],
    totalPage: nested?.totalPage || 1,
  };
};

export const getCategoryVideo = createAsyncThunk(
  "video/getCategoryVideo",
  async (searchTerm = "", { rejectWithValue }) => {
    const res = await apis.getCategoryVideo(searchTerm);
    if (res.ok) return { res, searchTerm };
    return rejectWithValue(res.message || "Lỗi tải video");
  }
);

export const getCategoryVideoDetail = createAsyncThunk(
  "video/getCategoryVideoDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getCategoryVideoDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết video");
  }
);

export const createCategoryVideo = createAsyncThunk(
  "video/createCategoryVideo",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.createCategoryVideo(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo video thất bại");
  }
);

export const updateCategoryVideo = createAsyncThunk(
  "video/updateCategoryVideo",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateCategoryVideo(data, id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật video thất bại");
  }
);

export const filterVideo = createAsyncThunk(
  "video/filterVideo",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterVideo(query, value, query2, value2);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc video thất bại");
  }
);

const initialState = {
  categoryVideo: [],
  searchVideo: [],
  searchType: false,
  totalPage: 1,
  videoDetail: {},
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryVideo.fulfilled, (state, action) => {
        const { list, searchList, totalPage } = normalize(action.payload.res);
        state.categoryVideo = list || [];
        state.searchVideo = searchList || [];
        state.searchType = !!action.payload.searchTerm;
        state.totalPage = totalPage || 1;
      })
      .addCase(getCategoryVideo.rejected, (state, action) => {
        state.error = action.payload || null;
        state.categoryVideo = [];
        state.searchVideo = [];
        state.searchType = false;
        state.totalPage = 1;
      })
      .addCase(getCategoryVideoDetail.fulfilled, (state, action) => {
        state.videoDetail = action.payload?.video || {};
      })
      .addCase(filterVideo.fulfilled, (state, action) => {
        state.categoryVideo = action.payload?.videoFormat || [];
        state.totalPage = action.payload?.totalPage || 1;
      });
  },
});

export default videoSlice.reducer;


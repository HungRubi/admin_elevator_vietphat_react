import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/article";
import { setMessage } from "./uiSlice";

const normalizeList = (res, search) => {
  const d = res?.data;
  const list = search ? d?.searchArticle : d?.articleFormat;
  return {
    article: list || [],
    totalPage: d?.totalPage || 1,
  };
};

export const getArticle = createAsyncThunk(
  "article/getArticle",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getArticle(search);
    if (res.ok) return { res: res.data, search };
    return rejectWithValue(res.message || "Lỗi tải bài viết");
  }
);

export const filterArticle = createAsyncThunk(
  "article/filterArticle",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterArticle(query, value, query2, value2);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc bài viết thất bại");
  }
);

export const getArticleDetail = createAsyncThunk(
  "article/getArticleDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getArticleDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết bài viết");
  }
);

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.createArticle(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo bài viết thất bại");
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateArticle(id, data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật bài viết thất bại");
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteArticle(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa bài viết thất bại");
  }
);

const initialState = {
  article: [],
  totalPage: 1,
  detailArticle: {},
  error: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticle.fulfilled, (state, action) => {
        const { article, totalPage } = normalizeList(action.payload.res, action.payload.search);
        state.article = article;
        state.totalPage = totalPage || 1;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.error = action.payload || null;
        state.article = [];
        state.totalPage = 1;
      })
      .addCase(filterArticle.fulfilled, (state, action) => {
        state.article = action.payload?.formatArticle || [];
        state.totalPage = action.payload?.totalPage || 1;
      })
      .addCase(getArticleDetail.fulfilled, (state, action) => {
        state.detailArticle = action.payload?.data?.article || {};
      });
  },
});

export default articleSlice.reducer;


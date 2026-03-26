import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/category";
import { setMessage } from "./uiSlice";

const normalizeList = (res) => {
  const d = res?.data;
  const nested = d?.data || d;
  return {
    items: nested?.categoryProduct || nested?.category || nested?.formatCategory || nested?.data || [],
    searchItems: nested?.searchProduct || [],
    totalPage: nested?.totalPage || 1,
  };
};

export const getCategoryProduct = createAsyncThunk(
  "categoryProduct/getCategoryProduct",
  async (searchTerm = "", { rejectWithValue }) => {
    const res = await apis.getCategoryProduct(searchTerm);
    if (res.ok) return { res, searchTerm };
    return rejectWithValue(res.message || "Lỗi tải danh mục");
  }
);

export const getCategoryProductDetail = createAsyncThunk(
  "categoryProduct/getCategoryProductDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getCategoryProductDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết danh mục");
  }
);

export const createCategoryProduct = createAsyncThunk(
  "categoryProduct/createCategoryProduct",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.createCategoryProduct(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo danh mục thất bại");
  }
);

export const updateCategoryProduct = createAsyncThunk(
  "categoryProduct/updateCategoryProduct",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateCategoryProduct(data, id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật danh mục thất bại");
  }
);

export const deleteCategoryProduct = createAsyncThunk(
  "categoryProduct/deleteCategoryProduct",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteCategoryProduct(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id, data: res.data };
    }
    return rejectWithValue(res.message || "Xóa danh mục thất bại");
  }
);

const initialState = {
  categoryProduct: [],
  searchProduct: [],
  searchType: false,
  totalPage: 1,
  categoryProductDetail: {},
  status: "idle",
  error: null,
};

const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCategoryProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { items, searchItems, totalPage } = normalizeList(action.payload.res);
        state.categoryProduct = items || [];
        state.searchProduct = searchItems || [];
        state.searchType = !!action.payload.searchTerm;
        state.totalPage = totalPage || 1;
      })
      .addCase(getCategoryProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message || null;
        state.categoryProduct = [];
        state.searchProduct = [];
        state.searchType = false;
        state.totalPage = 1;
      })
      .addCase(getCategoryProductDetail.fulfilled, (state, action) => {
        state.categoryProductDetail = action.payload?.data?.categoryProduct || action.payload || {};
      })
      .addCase(createCategoryProduct.rejected, (state, action) => {
        state.error = action.payload || null;
      })
      .addCase(updateCategoryProduct.rejected, (state, action) => {
        state.error = action.payload || null;
      })
      .addCase(deleteCategoryProduct.rejected, (state, action) => {
        state.error = action.payload || null;
      });
  },
});

export default categoryProductSlice.reducer;


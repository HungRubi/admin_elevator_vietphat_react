import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/products";
import { setMessage } from "./uiSlice";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getProducts(search);
    if (res.ok) return { data: res.data, search };
    return rejectWithValue(res.message || "Lỗi tải sản phẩm");
  }
);

export const getProductsEdit = createAsyncThunk(
  "product/getProductsEdit",
  async (id, { rejectWithValue }) => {
    const res = await apis.getProductsEdit(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết sản phẩm");
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.createProduct(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo sản phẩm thất bại");
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateProduct(data, id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật sản phẩm thất bại");
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteProduct(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa sản phẩm thất bại");
  }
);

export const filterProduct = createAsyncThunk(
  "product/filterProduct",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterProduct(query, value, query2, value2);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc sản phẩm thất bại");
  }
);

export const addProductByOrder = createAsyncThunk(
  "product/addProductByOrder",
  async (products) => products
);

const initialState = {
  products: [],
  total: 0,
  page: 1,
  limit: 10,
  offset: 0,
  totalPage: 1,
  detailProduct: {},
  categoryProduct: [],
  productsByOrder: [],
  error: null,
};

const unwrap = (payload) => payload?.data ?? payload;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        const d = unwrap(action.payload.data) || {};
        state.products = action.payload.search ? d?.searchProduct || [] : d?.productFormat || [];
        state.total = d?.total || 0;
        state.totalPage = d?.totalPages || d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
      })
      .addCase(getProductsEdit.fulfilled, (state, action) => {
        state.detailProduct = action.payload?.data?.product || {};
        state.categoryProduct = action.payload?.data?.category || [];
      })
      .addCase(filterProduct.fulfilled, (state, action) => {
        const d = unwrap(action.payload) || {};
        state.products = d?.productFormat || [];
        state.total = d?.total || 0;
        state.totalPage = d?.totalPages || d?.totalPage || 1;
        state.page = d?.page || 1;
        state.limit = d?.limit || 10;
        state.offset = d?.offset || 0;
      })
      .addCase(addProductByOrder.fulfilled, (state, action) => {
        state.productsByOrder = [...state.productsByOrder, ...(action.payload || [])];
      });
  },
});

export default productSlice.reducer;


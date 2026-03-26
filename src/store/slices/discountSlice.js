import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/category";
import { setMessage } from "./uiSlice";

const normalize = (res) => {
  const d = res?.data;
  const nested = d?.data || d;
  return {
    list: nested?.formatDiscount || [],
    searchList: nested?.searchDiscount || [],
    totalPage: nested?.totalPage || 1,
  };
};

export const getCategoryDiscount = createAsyncThunk(
  "discount/getCategoryDiscount",
  async (search = "", { rejectWithValue }) => {
    const res = await apis.getCategoryDiscount(search);
    if (res.ok) return { res, search };
    return rejectWithValue(res.message || "Lỗi tải voucher");
  }
);

export const getCategoryDiscountDetail = createAsyncThunk(
  "discount/getCategoryDiscountDetail",
  async (id, { rejectWithValue }) => {
    const res = await apis.getCategoryDiscountDetail(id);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chi tiết voucher");
  }
);

export const createDiscount = createAsyncThunk(
  "discount/createDiscount",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await apis.createDiscount(data);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Tạo voucher thất bại");
  }
);

export const updateDiscount = createAsyncThunk(
  "discount/updateDiscount",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const res = await apis.updateDiscount(data, id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return res.data;
    }
    return rejectWithValue(res.message || "Cập nhật voucher thất bại");
  }
);

export const deleteDiscount = createAsyncThunk(
  "discount/deleteDiscount",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await apis.deleteDiscount(id);
    if (res.ok) {
      dispatch(setMessage(res.data?.message));
      return { id };
    }
    return rejectWithValue(res.message || "Xóa voucher thất bại");
  }
);

export const filterDiscount = createAsyncThunk(
  "discount/filterDiscount",
  async ({ query, value, query2, value2 }, { rejectWithValue }) => {
    const res = await apis.filterDiscount(query, value, query2, value2);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lọc voucher thất bại");
  }
);

const initialState = {
  categoryDiscount: [],
  totalPage: 1,
  categoryDiscountDetail: {},
  status: "idle",
  error: null,
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryDiscount.fulfilled, (state, action) => {
        const { list, searchList, totalPage } = normalize(action.payload.res);
        state.categoryDiscount = action.payload.search ? searchList || [] : list || [];
        state.totalPage = totalPage || 1;
      })
      .addCase(getCategoryDiscount.rejected, (state, action) => {
        state.error = action.payload || null;
        state.categoryDiscount = [];
        state.totalPage = 1;
      })
      .addCase(getCategoryDiscountDetail.fulfilled, (state, action) => {
        state.categoryDiscountDetail = action.payload?.data?.discount || {};
      })
      .addCase(filterDiscount.fulfilled, (state, action) => {
        state.categoryDiscount = action.payload?.formatDiscount || [];
        state.totalPage = action.payload?.totalPage || 1;
      });
  },
});

export default discountSlice.reducer;


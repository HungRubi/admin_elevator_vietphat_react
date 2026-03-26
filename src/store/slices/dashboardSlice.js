import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/dashboard";

export const getTotalOrderLastWeek = createAsyncThunk(
  "dashboard/getTotalOrderLastWeek",
  async (_, { rejectWithValue }) => {
    const res = await apis.getTotalOrderLastWeek();
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải thống kê đơn");
  }
);

export const getNewUser = createAsyncThunk(
  "dashboard/getNewUser",
  async (days, { rejectWithValue }) => {
    const res = await apis.getNewUser(days);
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải thống kê user");
  }
);

export const getOrderDiscount = createAsyncThunk(
  "dashboard/getOrderDiscount",
  async (_, { rejectWithValue }) => {
    const res = await apis.getOrderDiscount();
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chart voucher");
  }
);

export const getOrderPayment = createAsyncThunk(
  "dashboard/getOrderPayment",
  async (_, { rejectWithValue }) => {
    const res = await apis.getOrderPayment();
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chart payment");
  }
);

export const getMonthlyRevenue = createAsyncThunk(
  "dashboard/getMonthlyRevenue",
  async (_, { rejectWithValue }) => {
    const res = await apis.getMonthlyRevenue();
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải chart doanh thu");
  }
);

const initialState = {
  dataTotalOrder: [],
  summaryOrder: {},
  newUserData: [],
  summaryUser: {},
  dataDiscountChart: [],
  dataOrderPayment: [],
  dataMonthlyRevenue: [],
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalOrderLastWeek.fulfilled, (state, action) => {
        state.dataTotalOrder = action.payload?.data || [];
        state.summaryOrder = action.payload?.summary || {};
      })
      .addCase(getNewUser.fulfilled, (state, action) => {
        const p = action.payload?.data ?? action.payload ?? {};
        state.newUserData = p.chartData || [];
        state.summaryUser = p.summary || {};
      })
      .addCase(getOrderDiscount.fulfilled, (state, action) => {
        state.dataDiscountChart = action.payload?.data || [];
      })
      .addCase(getOrderPayment.fulfilled, (state, action) => {
        state.dataOrderPayment = action.payload?.data || [];
      })
      .addCase(getMonthlyRevenue.fulfilled, (state, action) => {
        state.dataMonthlyRevenue = action.payload?.data || [];
      });
  },
});

export default dashboardSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../endpoints/report";

const buildReportParams = (arg = {}) => {
  if (arg?.query != null && arg.value !== undefined && arg.value !== "") {
    const p = { [arg.query]: arg.value };
    if (arg.query2 && arg.value2 !== undefined && arg.value2 !== "")
      p[arg.query2] = arg.value2;
    if (arg.query3 && arg.value3 !== undefined && arg.value3 !== "")
      p[arg.query3] = arg.value3;
    return p;
  }
  return {
    date: arg.date,
    startDate: arg.startDate,
    endDate: arg.endDate,
    category: arg.category,
  };
};

export const getReport = createAsyncThunk(
  "report/getReport",
  async (arg, { rejectWithValue }) => {
    const res = await apis.getReport(buildReportParams(arg));
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải report");
  }
);

export const getReprotWeek = createAsyncThunk(
  "report/getReprotWeek",
  async (_, { rejectWithValue }) => {
    const res = await apis.getReprotWeek();
    if (res.ok) return res.data;
    return rejectWithValue(res.message || "Lỗi tải report tuần");
  }
);

const unwrapBody = (body) => body?.data ?? body;

const initialState = {
  warehouseReport: [],
  columnComment: [],
  formatComment: [],
  productTren: [],
  summaryReport: {},
  dataCategoryChart: [],
  topSpenders: [],
  dataReportWeek: [],
  error: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReport.fulfilled, (state, action) => {
        const p = unwrapBody(action.payload) || {};
        state.warehouseReport = p.warehouses || [];
        state.columnComment = p.columnComment || [];
        state.formatComment = p.formatComment || [];
        state.productTren = p.productTren || [];
        state.summaryReport = p.summary || {};
        state.dataCategoryChart = p.dataCategoryChart || [];
        state.topSpenders = p.topSpenders || [];
      })
      .addCase(getReprotWeek.fulfilled, (state, action) => {
        const w = unwrapBody(action.payload) || {};
        state.dataReportWeek = w.result || [];
      });
  },
});

export default reportSlice.reducer;


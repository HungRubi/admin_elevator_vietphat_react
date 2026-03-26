import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../endpoints/auth";
import {
  clearAccessToken,
  setAccessToken as applyAccessTokenToAxios,
} from "../../axios";

const pickLoginError = (res) => {
  const raw = res?.data?.message ?? res?.message;
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  return "Đăng nhập thất bại";
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    const res = await apis.loginAdmin(credentials);
    if (res.ok && res.status === 200 && res.data?.accessToken) {
      applyAccessTokenToAxios(res.data.accessToken);
      return res.data;
    }
    return rejectWithValue(pickLoginError(res));
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await apis.logout();
  } catch {
    /* vẫn xóa phiên cục bộ */
  } finally {
    clearAccessToken();
  }
  return null;
});

/**
 * Khôi phục `currentUser` từ GET /auth/me khi đã có accessToken (reload / persist).
 * 404 → logout. Lỗi khác: nếu chưa có user trong store thì logout; nếu đã có user (persist) thì giữ user cũ.
 */
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { accessToken, currentUser } = getState().auth;
    if (!accessToken) {
      return null;
    }
    applyAccessTokenToAxios(accessToken);
    const res = await apis.getAuthMe();
    if (res.ok && res.status === 200 && res.data?.user) {
      return res.data.user;
    }
    if (res.status === 404) {
      await dispatch(logoutUser());
      return rejectWithValue("not_found");
    }
    if (!currentUser?._id) {
      await dispatch(logoutUser());
      return rejectWithValue("restore_failed");
    }
    return currentUser;
  }
);

const initialState = {
  currentUser: null,
  accessToken: null,
  loginStatus: "idle",
  loginError: null,
  toastMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload ?? null;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload ?? null;
    },
    clearAuthToast(state) {
      state.toastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loginStatus = "loading";
        state.loginError = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginError = null;
        state.currentUser = action.payload?.user ?? null;
        state.accessToken = action.payload?.accessToken ?? null;
        const m = action.payload?.message;
        state.toastMessage =
          typeof m === "string" && m.trim() ? m.trim() : "Login successful";
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError =
          typeof action.payload === "string"
            ? action.payload
            : "Đăng nhập thất bại";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.accessToken = null;
        state.loginStatus = "idle";
        state.loginError = null;
        state.toastMessage = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        if (action.payload != null) {
          state.currentUser = action.payload;
        }
      });
  },
});

export const { setAccessToken, setCurrentUser, clearAuthToast } =
  authSlice.actions;

/** Giữ tên cũ `login` / `logout` / `setAccessTokenState` qua store/actions/auth.js */
export const login = loginAdmin;
export const logout = logoutUser;
export const setAccessTokenState = setAccessToken;

export default authSlice.reducer;

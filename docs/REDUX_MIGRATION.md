# Roadmap Redux → Redux Toolkit (dashboard)

## Mục tiêu

- Bỏ **`redux-thunk`** thủ công + pattern action type dài; dùng **`@reduxjs/toolkit`** (`configureStore`, `createSlice`, `createAsyncThunk`).
- **Tách reducer:** gom state theo domain (ví dụ `auth`, `app`/`reducerApp` cho layout & message chung, sau đó tách tiếp `orders`, `products`, …).
- **`loading` / `error`:** ưu tiên theo **slice** hoặc **async thunk** (`pending` / `rejected`) cho từng luồng; `globalLoading` giữ cho axios interceptor khi cần overlay toàn app.
- **Không đổi giao diện** — chỉ đổi nguồn state và dispatch.

## Tiến độ

| Bước | Phạm vi | Trạng thái |
|------|---------|------------|
| 1 | Auth: `authSlice`, persist `currentUser` + `accessToken`, login admin only | Hoàn thành |
| 2 | Tách `appReducer` → các slice nhỏ hoặc `reducerApp` + slice con | Kế hoạch |
| 3 | Thay lần lượt các `store/actions/*.js` bằng thunk RTK / slice | Kế hoạch |
| 4 | Gỡ bỏ `actionTypes.js` khi không còn consumer | Kế hoạch |

## Quy ước

- **Auth:** `src/store/slices/authSlice.js` — `loginAdmin`, `logoutUser`, `restoreSession` (GET `/auth/me`), `setAccessToken` (refresh), toast một lần sau login qua `toastMessage` + `clearAuthToast`.
- **Persist:** giữ key `userAdmin` (whitelist `currentUser`, `accessToken`) để tương thích storage cũ. Root state đổi `user` → `auth`; nếu phiên cũ không rehydrate đúng, user có thể cần đăng nhập lại một lần.
- **Import actions:** tiếp tục export qua `src/store/actions/index.js` để component ít đổi import.

## Tài liệu liên quan

- Chi tiết API: [FRONTEND_AUTH.md](./FRONTEND_AUTH.md)

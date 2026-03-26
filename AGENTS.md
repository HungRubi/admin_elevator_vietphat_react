# Hướng dẫn cho Agent (Dashboard)

## Ngữ cảnh dự án

- **React 19 + Vite**, **Tailwind 4**, **Redux** đang chuyển dần sang **Redux Toolkit**.
- **Dashboard chỉ dành cho admin/staff:** đăng nhập qua **`POST /auth/login/admin`** (xem `docs/FRONTEND_AUTH.md`).
- Base API: biến môi trường **`VITE_SERVER_URL`**. Axios instance: `src/axios.js` (Bearer token + refresh cookie).

## Vibe & phong cách làm việc

- Ưu tiên **thay đổi tối thiểu**, đúng phạm vi task; không refactor rộng không được yêu cầu.
- **Không đổi UI** khi user nói rõ — chỉ đổi logic/state/API.
- Trả lời user bằng **tiếng Việt** trừ khi họ dùng ngôn ngữ khác.
- Trước khi kết luận “xong”, **chạy lệnh kiểm tra** (`yarn build` / `yarn lint`) và dựa vào output thực tế.

## Skills — khi nào dùng

| Tình huống | Skill |
|------------|--------|
| Bắt đầu phiên, biết cách ưu tiên skill | `using-superpowers` |
| Feature / hành vi mới, nhiều hướng thiết kế | `brainstorming` → `writing-plans` |
| Nhiều bước có spec rõ | `writing-plans` / `executing-plans` |
| Bug, test fail | `systematic-debugging` |
| Trước khi merge / claim hoàn thành | `verification-before-completion` |
| React / Next performance | `vercel-react-best-practices` |
| UI / a11y audit có yêu cầu | `web-design-guidelines` |

Nếu có **≥2 việc độc lập**, cân nhắc `dispatching-parallel-agents` hoặc tách task rõ ràng.

## Cấu trúc store (hướng tới)

- `src/store/slices/` — RTK slices (`authSlice`, …).
- `src/store/reducers/rootReducers.js` — `combineReducers` + `redux-persist`.
- `src/redux.js` — `configureStore` (middleware serializable ignore cho persist).
- Roadmap chi tiết: `docs/REDUX_MIGRATION.md`.

## API & auth

- Wrapper request: `src/store/request.js` (trả `{ ok, status, data, message }`; có `finishRequest` cho thunk).
- HTTP theo domain: `src/store/endpoints/*.js` (import trong slice tương ứng).
- Barrel dispatch: `src/store/actions.js` (thay thư mục `store/actions/`).
- Tài liệu server: `docs/FRONTEND_AUTH.md`.

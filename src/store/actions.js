/**
 * Barrel thay cho thư mục `store/actions/`: export thunk + action từ slices.
 * Component: `import * as actions from './store/actions'` hoặc `'../store/actions'`.
 */
export { resetMessage, setGlobalLoading, setMessage } from "./slices/uiSlice";

export * from "./slices/authSlice";
export * from "./slices/articleSlice";
export * from "./slices/orderSlice";
export * from "./slices/notificationSlice";
export * from "./slices/warrantySlice";
export * from "./slices/warehouseSlice";
export * from "./slices/userSlice";
export * from "./slices/supplierSlice";
export { updateSupplier as update } from "./slices/supplierSlice";
export * from "./slices/receiptSlice";
export * from "./slices/productSlice";
export * from "./slices/dashboardSlice";
export * from "./slices/reportSlice";
export * from "./slices/commentSlice";

export {
  getCategoryProduct,
  getCategoryProductDetail,
  createCategoryProduct,
  updateCategoryProduct,
  deleteCategoryProduct,
} from "./slices/categoryProductSlice";

export {
  getCategoryDiscount,
  getCategoryDiscountDetail,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  filterDiscount,
} from "./slices/discountSlice";

export {
  getCategoryBanner,
  getCategoryBannerDetail,
  createBanner,
  updateBanner,
  filterBanner,
} from "./slices/bannerSlice";

export {
  getCategoryVideo,
  getCategoryVideoDetail,
  createCategoryVideo,
  updateCategoryVideo,
  filterVideo,
} from "./slices/videoSlice";

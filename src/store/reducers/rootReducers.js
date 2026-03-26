import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import authReducer from "../slices/authSlice";
import uiReducer from "../slices/uiSlice";
import categoryProductReducer from "../slices/categoryProductSlice";
import discountReducer from "../slices/discountSlice";
import bannerReducer from "../slices/bannerSlice";
import videoReducer from "../slices/videoSlice";
import articleReducer from "../slices/articleSlice";
import supplierReducer from "../slices/supplierSlice";
import receiptReducer from "../slices/receiptSlice";
import warehouseReducer from "../slices/warehouseSlice";
import notificationReducer from "../slices/notificationSlice";
import warrantyReducer from "../slices/warrantySlice";
import productReducer from "../slices/productSlice";
import orderReducer from "../slices/orderSlice";
import userReducer from "../slices/userSlice";
import dashboardReducer from "../slices/dashboardSlice";
import reportReducer from "../slices/reportSlice";
import commentReducer from "../slices/commentSlice";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const authPersistConfig = {
  ...commonConfig,
  key: "userAdmin",
  whitelist: ["currentUser", "accessToken"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  ui: uiReducer,
  categoryProduct: categoryProductReducer,
  discount: discountReducer,
  banner: bannerReducer,
  video: videoReducer,
  article: articleReducer,
  supplier: supplierReducer,
  receipt: receiptReducer,
  warehouse: warehouseReducer,
  notification: notificationReducer,
  warranty: warrantyReducer,
  product: productReducer,
  order: orderReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  report: reportReducer,
  comment: commentReducer,
});

export default rootReducer;

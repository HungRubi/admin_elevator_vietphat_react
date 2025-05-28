import { BiMessageError } from "react-icons/bi";
import actionType from "../actions/actionTypes";

const initState = {
    products: [],
    user: [],
    article: [],
    order: [],
    categoryProduct: [],
    categoryDiscount: [],
    categoryBanner: [],
    detailUser: {},
    detailProduct: {},
    detailArticle: {},
    orderProduct: [],
    orderDiscount: [],
    orderUser: [],
    orderEditProduct: [],
    orderDetail: {},
    discountOrder: {},
    categoryProductDetail: {},
    categoryDiscountDetail: {},
    categoryBannerDetail: {},
    categoryProductAdd: [],
    categoryProductUpdate: [],
    categoryProductDelete: [],
    categoryVideoAdd: [],
    categoryVideo: [],
    videoDetail: {},
    categoryVideoUpdate: [],
    currentUser: {},
    message: null,
    loginError: null,
    comment: [],
    productsByOrder: [],
    suppliers: [],
    productsBySupplier: [],
    receipts: [],
    receipt: {},
    receiptDetail: [],
    warehouse: [],
    notificaiton: [],
    notificaitonDetails: {},
    ordersByWarranty: [],
    warranties: [],
    warranty: {},
}

const appReducer = (state = initState, action) => {
    switch(action.type){

        /** === GLOBAL === */
        case actionType.RESET_MESSAGE:
            return {
                ...state,
                message:null
            }

        /** WARRANTY */
        case actionType.GET_WARRANTY:
            return {
                ...state,
                warranties: action.payload.search 
                ? action.payload?.data?.searchWarranty 
                : action.payload?.data?.warranties,
                totalPage: action.payload?.data?.totalPage || 1
            }

        case actionType.GET_DETAIL_WARRANTY:
            return {
                ...state,
                warranty: action.payload.warranty,
            }

        case actionType.GET_ADD_WARRANTY:
            return {
                ordersByWarranty: action.payload.orders
            }

        case actionType.GET_ADD_WARRANTY_ERR:
            return {
                message: action.payload.message
            }

        case actionType.ADD_WARRANTY:
            return {
                message: action.payload.message
            }

        case actionType.ADD_WARRANTY_ERR:
            return {
                message: action.payload.message
            }

        case actionType.UPDATE_WARRANTY_ERR:
            return {
                ...state,
                message: action.payload.message || null
            }
        
        case actionType.UPDATE_WARRANTY:
            return {
                ...state,
                message: action.payload.message || null
            }
        
        case actionType.DELETE_WARRANTY:
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.DELETE_WARRANTY_ERR:
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.FILTER_WARRANTY:
            return {
                ...state,
                warranties: action.payload.warranties
            }

        case actionType.FILTER_WARRANTY_ERR:
            return {
                ...state,
                message: action.payload.message
            }
        

        /** === NOTIFICATION === */
        case actionType.GET_NOTIFICATION:
            return {
                ...state,
                notificaiton: action.payload.search ? 
                action.payload?.data?.searchNotification : 
                action.payload?.data?.notifications,
                totalPage: action.payload?.data?.totalPage
            }

        case actionType.GET_NOTIFICATION_ERR:
            return{
                ...state,
                message: action.payload.message || null
            }

        case actionType.ADD_NOTIFICATION:
            return{
                ...state,
                message: action.payload.message || null
            }

        case actionType.ADD_NOTIFICATION_ERR:
            return{
                ...state,
                message: action.payload.message || null
            }

        case actionType.DELETE_NOTIFICATION:
            return{
                ...state,
                message: action.payload.message || null
            }

        case actionType.DELETE_NOTIFICATION_ERR:
            return{
                ...state,
                message: action.payload.message || null
            }

        case actionType.EDIT_NOTIFICATION:
            return{
                ...state,
                notificaitonDetails: action.payload.notification
            }

        case actionType.EDIT_NOTIFICATION_ERR:
            return{
                ...state,
                message: action.payload.message || null
            }
        

        /** === WAREHOUSE === */
        case actionType.GET_WAREHOUSE:
            return {
                ...state,
                warehouse: action.payload?.search ?
                action.payload?.data?.searchWarehouse : 
                action.payload?.data?.warehouses,
                totalPage: action.payload?.data?.totalPage || 1,
            }

        case actionType.GET_WAREHOUSE_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }


        /** === RECEIPT  === */
        case actionType.ADD_RECEIPT: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.ADD_RECEIPT_ERR: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.GET_RECEIPT:
            return {
                ...state,
                receipts: action.payload.search ? 
                action.payload?.data?.receiptSearch :
                action.payload?.data?.receipts,
                totalPage: action.payload?.data?.totalPages || 1
            }

        case actionType.FILTER_RECEIPT:
            return {
                ...state,
                receipts: action.payload.receipts
            }
        
        case actionType.FILTER_RECEIPT_ERR:
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.GET_RECEIPT_ERR: 
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.GET_DETAIL_RECEIPT:
            return {
                ...state,
                receipt: action.payload.receipt,
                receiptDetail: action.payload.receiptDetails
            }
        
        case actionType.UPDATE_RECEIPT:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.UPDATE_RECEIPT_ERR:
            return {
                ...state,
                message: action.payload.message
            }
        
        case actionType.DELETE_RECEIPT:
            return {
                ...state,
                message: action.payload.message
            }
        
        case actionType.DELETE_RECEIPT_ERR:
            return {
                ...state,
                message: action.payload.message
            }



        /** === SUPPLIER === */

        case actionType.GET_SUPPLIER:
            return {
                ...state,
                suppliers: action.payload?.search ? 
                action.payload?.data?.searchSupplier : 
                action.payload?.data?.supplier,
                totalPage: action.payload?.data?.totalPage || 1,
            }
        case actionType.GET_PRODUCT_BY_SUPPLIER:
            return {
                ...state,
                productsBySupplier: action.payload?.products || [],
            }
        case actionType.GET_PRODUCT_BY_SUPPLIER_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }
        case actionType.GET_SUPPLIER_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.ADD_SUPPLIER:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.ADD_SUPPLIER_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        
        case actionType.GET_DETAIL_SUPPLIER:
            return {
                ...state,
                detailSupplier: action.payload?.supplier || {},
            }

        case actionType.GET_DETAIL_SUPPLIER_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.UPDATE_SUPPLIER:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.UPDATE_SUPPLIER_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.DELETE_SUPPLIER:
            return {
                ...state,
                message: action.payload?.message || null,
                suppliers: action.payload?.suppliers || [],
            }

        case actionType.DELETE_SUPPLIER_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }


        /** === COMMENT === */
        case actionType.GET_COMMENT: 
            return {
                ...state,
                comment: action.payload?.search ? 
                action.payload?.data?.searchComment : 
                action.payload?.data?.comment,
                totalPage: action.payload?.data?.totalPage 
            }
            
        case actionType.FILTER_COMMENT:
            return {
                ...state,
                comment: action.payload?.comment
            }

        case actionType.FILTER_COMMENT_ERR:
            return {
                ...state,
                message: action.payload?.message
            }


        /** === LOGIN === */
        case actionType.LOGIN:
            return {
                ...state,
                currentUser: action.payload?.user || {},
                message: action.payload?.message || null,
                loginError: null
            }
        case actionType.LOGIN_FAIL:
            return {
                ...state,
                message: null,
                loginError: action.payload || null,
            }
        
        /** === PRODUCT === */
        case actionType.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload?.search ?
                action.payload?.data?.searchProduct : 
                action.payload?.data?.productFormat,
                totalPage: action.payload?.data?.totalPage || 1,
            }

        case actionType.GET_DETAIL_PRODUCTS:
            return {
                ...state,
                detailProduct: action.payload?.data?.product || {},
                categoryProduct: action.payload?.data?.category
            }

        case actionType.ADD_PRODUCT_BY_ORDER:
            return {
                ...state,
                productsByOrder: [...state.productsByOrder, ...action.payload],
                message: "Thêm sản vào đơn hàng thành công",
            }
        
        case actionType.ADD_ORDER:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.CREATE_PRODUCT: 
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.CREATE_PRODUCT_ERR: 
            return {
                ...state,
                message: action.payload?.message || null,
            }
        
        case actionType.UPDATE_PRODUCT:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.UPDATE_PRODUCT_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.DELETE_PRODUCT:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.DELETE_PRODUCT_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.FILTER_PRODUCT:
            return {
                ...state,
                products: action.payload?.productFormat || [],
                totalPage: action.payload?.totalPage || 1
            }

        case actionType.FILTER_PRODUCT_ERR:
            return {
                ...state,
                message: action.payload?.message || null,
            }


        /** === USER === */
        case actionType.GET_USER:
            return {
                ...state,
                user: action.payload.search ? 
                action.payload?.data?.data?.searchUser : 
                action.payload?.data?.data?.formatUser,
                totalUser: action.payload?.data?.data?.totalUser || 1,
                totalPage: action.payload?.data?.data?.totalPage || 1,
            }
        
        case actionType.GET_DETAIL_USER:
            return {
                ...state,
                detailUser: action.payload?.data?.user || [],
                
            }

        case actionType.UPDATE_USER:
            return {
                ...state,
                message: "Cập nhật user thành công",
            } 
        
        case actionType.CREATE_USER:
            return {
                ...state,
                message: action.payload?.message,
            }
        
        case actionType.CREATE_USER_ERROR:
            return {
                ...state,
                message: action.payload?.message,
            }

        case actionType.FILTER_USER: 
            return {
                ...state,
                user: action.payload?.formatUser,
                totalPage: action.payload?.totalPage
            }

        case actionType.FILTER_USER_ERR: 
        return {
            ...state,
            message: action.payload?.message || "Lỗi server xin thử lại sau",
        }

        case actionType.DELETE_USER:
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.DELETE_USER_ERR:
            return {
                ...state,
                message: action.payload?.message
            }


        /** === ARTICLE === */
        case actionType.GET_ARTICLE:
            return {
                ...state,
                article: action.payload?.search ? 
                action.payload?.data?.searchArticle : 
                action.payload?.data?.articleFormat,
                totalPage: action.payload?.data?.totalPage || 1
            }

        case actionType.GET_ARTICLE_ERR:
            return {
                ...state,
                message: action.payload?.message,
            }
        
        case actionType.GET_DETAIL_ARTICLE:
                return {
                    ...state,
                    detailArticle: action.payload?.data?.article || {},
            }
        
        case actionType.UPDATE_ARTICLE: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.UPDATE_ARTICLE_ERR: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.FILTER_ARTICLE: 
            return {
                ...state,
                article: action.payload?.formatArticle,
                totalPage: action.payload?.totalPage,
            }

        case actionType.CREATE_ARTICLE: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.CREATE_ARTICLE_ERR: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.FILTER_ARTICLE_ERR: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.DELETE_ARTICLE:
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.DELETE_ARTICLE_ERR:
            return {
                ...state,
                message: action.payload?.message
            }

        /** === ORDER === */
        case actionType.GET_ORDER:
            return {
                ...state,
                order: action.payload?.searchType ? 
                action.payload?.data?.data?.searchOrder :
                action.payload?.data?.data?.orderFormat,
                totalPage: action.payload?.data?.data?.totalPage || 1,
                searchType: action.payload?.searchType || false,
            }
        case actionType.FILTER_ORDER:
            return {
                ...state,
                order: action.payload?.orders,
                totalPage: action.payload?.totalPage || 1
            }

        case actionType.GET_ADD_ORDER:
            return {
                ...state,
                orderProduct: action.payload?.data?.products || [],
                orderDiscount: action.payload?.data?.discounts || [],
                orderUser: action.payload?.data?.users || [],
            }

        case actionType.GET_ORDER_DETAIL:
            return {
                ...state,
                orderEditProduct: action.payload?.data?.orderDetailsFormat || [],
                orderDetail: action.payload?.data?.orders || {},
                discountOrder: action.payload?.data?.discount || {},
            }

        case actionType.UPDATE_ORDER: 
            return {
                ...state,
                message: action.payload?.message || null,
            }

        case actionType.DELETE_ORDER:
            return {
                ...state,
                message: action.payload?.message || null
            }

        /** === CATEGORY PRODUCT === */
        case actionType.GET_CATEGORY_PRODUCT:
            return {
                ...state,
                categoryProduct: action.payload?.data?.data?.categoryProduct,
                searchProduct: action.payload?.searchType 
                ? action.payload?.data?.data?.searchProduct || []  
                : [],
                totalPage: action.payload?.data?.totalPage || 1,
                searchType: action.payload?.searchType || false,
            }

        case actionType.GET_CATEGORY_PRODUCT_DETAIL:
            return {
                ...state,
                categoryProductDetail: action.payload?.data?.categoryProduct || {},
            }

        case actionType.CREATE_CATEGORY_PRODUCT:
            return {
                ...state,
                categoryProductAdd: [...state.categoryProductAdd, action.payload],
                message: action.payload,
            }

        case actionType.UPDATE_CATEGORY_PRODUCT:
            return {
                ...state,
                categoryProductUpdate: [...state.categoryProductUpdate, action.payload],
                message: action.payload,
            };
        
        case actionType.DELETE_CATEGORY_PRODUCT:
            return {
                ...state,
                categoryProductDelete: state.categoryProductDelete.filter(
                    (item) => item._id !== action.payload 
                ),
                message: action.payload,
            };

        /** === CATEGORY DISCOUNT === */
        case actionType.GET_CATEGORY_DISCOUNT:
            return {
                ...state,
                categoryDiscount: action.payload?.search ? 
                action.payload?.data?.data?.searchDiscount : 
                action.payload?.data?.data?.formatDiscount,
                totalPage: action.payload?.data?.totalPage || 1
            }

        case actionType.GET_CATEGORY_DISCOUNT_DETAIL:
            return {
                ...state,
                categoryDiscountDetail: action.payload?.data?.discount || {}
            }

        case actionType.CREATE_DISCOUNT: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.CREATE_DISCOUNT_ERR: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.UPDATE_DISCOUNT: 
        return {
            ...state,
            message: action.payload?.message
        }

        case actionType.UPDATE_DISCOUNT_ERR: 
            return {
                ...state,
                message: action.payload?.message
            }

        case actionType.FILTER_DISCOUNT:
            return  {
                ...state,
                categoryDiscount: action.payload?.formatDiscount,
                totalPage: action.payload?.totalPage
            } 
            
        case actionType.FILTER_DISCOUNT_ERR:
            return  {
                ...state,
                message: action.payload?.message,
            }  


        /** === CATEGORY BANNER === */
        case actionType.GET_CATEGORY_BANNER:
            return {
                ...state,
                categoryBanner: action.payload?.search ? 
                action.payload?.data?.data?.searchBanner : 
                action.payload?.data?.data?.formatBanner,
                totalPage: action.payload?.data?.totalPage || 1
            }

        case actionType.GET_CATEGORY_DETAIL_BANNER:
            return {
                ...state,
                categoryBannerDetail: action.payload?.data?.banner || {},
            }
        
        case actionType.UPDATE_BANNER:
            return {
                ...state,
                message: action.payload?.message,
            }

        case actionType.UPDATE_BANNER_ERR:
            return {
                ...state,
                message: action.payload?.message,
            }
        
        case actionType.CREATE_BANNER:
            return {
                ...state,
                message: action.payload?.message,
            }

        case actionType.CREATE_BANNER_ERR:
            return {
                ...state,
                message: action.payload?.message,
            }

        case actionType.FILTER_BANNER:
            return {
                ...state,
                totalPage: action.payload?.totalPage,
                categoryBanner: action.payload?.bannerFormat
            }

        case actionType.FILTER_BANNER_ERR:
            return {
                ...state,
                message: action.payload?.message
            }
        
    
        /** === CATEGORY VIDEO */
        case actionType.GET_CATEGORY_VIDEO:
            return {
                ...state,
                categoryVideo: action.payload?.data?.data?.categoryVideo,
                searchVideo: action.payload?.searchType 
                ? action.payload?.data?.data?.searchVideo || []  // Khi search, cập nhật searchProduct
                : [],
                totalPage: action.payload?.data?.totalPage || 1,
                searchType: action.payload?.searchType || false,
            }
        case actionType.CREATE_CATEGORY_VIDEO:
            return {
                ...state,
                message: action.payload,
            }

        case actionType.GET_CATEGORY_VIDEO_DETAIL:
            return {
                ...state,
                videoDetail: action.payload?.video || {},
            }

        case actionType.UPDATE_CATEGORY_VIDEO:
            return {
                ...state,
                message: action.payload,
            };

        case actionType.FILTER_VIDEO:
            return {
                ...state,
                totalPage: action.payload?.totalPage,
                categoryVideo: action.payload?.videoFormat
            }

        case actionType.FILTER_VIDEO_ERR:
            return {
                ...state,
                message: action.payload?.message
            }
        default:
            return state;
    }
}

export default appReducer

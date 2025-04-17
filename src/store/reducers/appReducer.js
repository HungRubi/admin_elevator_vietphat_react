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
}

const appReducer = (state = initState, action) => {
    switch(action.type){

        /** === GLOBAL === */
        case actionType.RESET_MESSAGE:
            return {
                ...state,
                message:null
            }
        /** === COMMENT === */
        case actionType.GET_COMMENT: 
            return {
                ...state,
                comment: action.payload?.comment
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
                products: action.productData?.data?.products || [],
                totalPage: action.productData?.data?.totalPage || 1,
                currentPage: action.productData?.data?.currentPage || 1,
                
            }

        case actionType.GET_DETAIL_PRODUCTS:
            return {
                ...state,
                detailProduct: action.payload?.data?.product || {},
                categoryProduct: action.payload?.data?.category
            }
        

        /** === USER === */
        case actionType.GET_USER:
            return {
                ...state,
                user: action.payload?.data?.formatUser || [],
                totalUser: action.payload?.data?.totalUser || 1,
                totalPage: action.payload?.data?.totalPage || 1,
            }
        
        case actionType.GET_DETAIL_USER:
            return {
                ...state,
                detailUser: action.payload?.data?.user || [],
                
            }


        /** === ARTICLE === */
        case actionType.GET_ARTICLE:
            return {
                ...state,
                article: action.payload?.data?.articles || [],
                totalPage: action.payload?.data?.totalPage || 1
            }
        
        case actionType.GET_DETAIL_ARTICLE:
                return {
                    ...state,
                    detailArticle: action.payload?.data?.article || {},
            }
        

        /** === ORDER === */
        case actionType.GET_ORDER:
            return {
                ...state,
                order: action.payload?.data?.orderFormat || [],
                totalPage: action.payload?.data?.totalPage || 1
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

        /** === CATEGORY PRODUCT === */
        case actionType.GET_CATEGORY_PRODUCT:
            return {
                ...state,
                categoryProduct: action.payload?.data?.data?.categoryProduct,
                searchProduct: action.payload?.searchType 
                ? action.payload?.data?.data?.searchProduct || []  // Khi search, cập nhật searchProduct
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
                categoryDiscount: action.payload?.data?.formatDiscount || [],
                totalPage: action.payload?.data?.totalPage || 1
            }

        case actionType.GET_CATEGORY_DISCOUNT_DETAIL:
            return {
                ...state,
                categoryDiscountDetail: action.payload?.data?.discount || {}
            }


        /** === CATEGORY BANNER === */
        case actionType.GET_CATEGORY_BANNER:
            return {
                ...state,
                categoryBanner: action.payload?.data?.formatBanner || [],
                totalPage: action.payload?.data?.totalPage || 1
            }

        case actionType.GET_CATEGORY_DETAIL_BANNER:
            return {
                ...state,
                categoryBannerDetail: action.payload?.data?.banner || {},
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
                categoryVideoAdd: [...state.categoryVideoAdd, action.payload],
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
                categoryVideoUpdate: [...state.categoryVideoUpdate, action.payload],
                message: action.payload,
            };
        default:
            return state;
    }
}

export default appReducer

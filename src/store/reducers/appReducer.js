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
}

const appReducer = (state = initState, action) => {
    switch(action.type){
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
        case actionType.RESET_MESSAGE:
            return {
                ...state,
                message:null
            }
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

        case actionType.GET_CATEGORY_PRODUCT:
            return {
                ...state,
                categoryProduct: action.payload?.data?.categoryProduct || [],
                totalPage: action.payload?.data?.totalPage || 1
            }

        case actionType.GET_CATEGORY_PRODUCT_DETAIL:
            return {
                ...state,
                categoryProductDetail: action.payload?.data?.categoryProduct || {},
            }

        case actionType.CREATE_CATEGORY_PRODUCT:
            console.log(action.payload);
            return {
                ...state,
                categoryProductAdd: [...state.categoryProductAdd, action.payload],
                message: action.payload,
            };

        case actionType.UPDATE_CATEGORY_PRODUCT:
            console.log(action.payload);
            return {
                ...state,
                categoryProductUpdate: [...state.categoryProductUpdate, action.payload],
                message: action.payload,
            };
            

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
    

        default:
            return state;
    }
}

export default appReducer

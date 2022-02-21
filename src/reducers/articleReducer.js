import { SET_LOADING_STATUS, GET_ARTICLES, LIKE_ARTICLES } from "../actions/actionType";

export const initState = {
    loading: false,
    articles: [],
    likeCount: 0,
}

const articleReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            }
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        case LIKE_ARTICLES:
            return {
                ...state,
                likeCount: state.likeCount + 1,
            }
        
        default:
            return state;
    }
};

export default articleReducer;
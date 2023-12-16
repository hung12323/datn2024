// src/reducers/articlesReducer.js
const initialState = {
  articles: [],
  loading: false,
  page: 1,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;

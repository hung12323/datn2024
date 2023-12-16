// src/actions/articlesActions.js
export const setArticles = articles => ({
  type: 'SET_ARTICLES',
  payload: articles,
});

export const setLoading = loading => ({
  type: 'SET_LOADING',
  payload: loading,
});

export const setPage = page => ({
  type: 'SET_PAGE',
  payload: page,
});

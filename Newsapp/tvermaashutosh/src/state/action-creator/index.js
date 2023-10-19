export const searchArticle = (query) => {
    return (dispatch) => {
        dispatch({
            type: 'search',
            payload: query
        })
    }
}
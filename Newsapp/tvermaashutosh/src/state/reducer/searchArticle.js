const reducer = async (state = { articles: [] }, action) => {
    if (action.type === 'search') {
        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${action.payload}&api-key=G0hi9JktPaMmV6i0GVcnNZXjoA4RXkQ9`;
        let data = await fetch(url);
        let parsedData = await data.json()
        state = {
            articles: parsedData.response.docs,
            query: action.payload
        }
        return state;
    }
    else {
        return state;
    }
}

export default reducer;
import { combineReducers } from "redux";
import searchArticle from "./searchArticle";

const reducer = combineReducers({
    search: searchArticle
})

export default reducer
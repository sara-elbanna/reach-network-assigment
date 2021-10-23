import { loadingBarReducer } from "react-redux-loading-bar"
import { combineReducers } from "redux"
import { youtubeSearch } from "./youtubeSearchReducer"

const appReducer = combineReducers({
    youtubeSearchResult: youtubeSearch,
    loadingBar: loadingBarReducer
 })
 export type AppState = ReturnType<typeof appReducer>

 export default appReducer
import { combineReducers } from "redux"
import { youtubeSearch } from "./youtubeSearchReducer"

const appReducer = combineReducers({
    youtubeSearchResult: youtubeSearch
 })
 export type AppState = ReturnType<typeof appReducer>

 export default appReducer
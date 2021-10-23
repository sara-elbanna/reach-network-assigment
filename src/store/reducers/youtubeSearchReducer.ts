import { searchResult as SearchResult, SET_SEARCH_TEXT, SET_YOUTUBE_SEARCH_RESULT, YoutubeSearchActions } from 'store/actions/youtubeSearchActions'

type InitialStateType={
    searchResult:SearchResult |null,
    searchText: string
}
let initialState:InitialStateType = {
    searchResult: null,
    searchText: ''
}
export function youtubeSearch(state = initialState, action: YoutubeSearchActions):InitialStateType {
    switch (action.type) {
        case SET_YOUTUBE_SEARCH_RESULT:
            return {
                ...state, searchResult: action.payload
            }
        case SET_SEARCH_TEXT:
            return {
                ...state, searchText: action.payload
            }
        default:
            return state
    }
}

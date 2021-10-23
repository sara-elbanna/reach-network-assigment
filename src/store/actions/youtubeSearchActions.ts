import { hideLoading, showLoading } from "react-redux-loading-bar"

export const SET_YOUTUBE_SEARCH_RESULT = 'SET_YOUTUBE_SEARCH_RESULT'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'
const apiKey = 'AIzaSyDtbKOvTS5RlWgpq3p2Kb07U08xBfHfrEU'

export type Video = {
    id: string,
    publishedTime: string,
    duration: string | null,
    viewCount: string | null,
    title: string,
    description: string,
    channelTitle: string,
    thumbnailUrl: string
}
export type searchResult = {
    totalResults: string,
    videos: Video[]
}
export function fetchYoutubeSearchResult(searchText: string) {
    return async (dispatch: any) => {
        dispatch(showLoading())
        let { videosList, videosIds, totalResults} = await getVideosBasicInfo(searchText)
        let commaSeparatedIds = videosIds.toString()
        let videosDetailsRequest = `https://www.googleapis.com/youtube/v3/videos?id=${commaSeparatedIds}&key=${apiKey}&part=contentDetails,statistics`
        let videosDetailsResult: any = await fetch(videosDetailsRequest)
        videosDetailsResult = await videosDetailsResult.json()
        if (videosDetailsResult.items) {
            videosDetailsResult.items.forEach((item: any) => {
                videosList[item.id]['duration'] = item.contentDetails.duration
                videosList[item.id]['viewCount'] = item.statistics.viewCount
            })
        }
        let searchResult = {
            totalResults: totalResults,
            videos: Object.values(videosList)
        }
        dispatch({ type: SET_YOUTUBE_SEARCH_RESULT, payload: searchResult })
        dispatch(hideLoading())

    }
}

async function getVideosBasicInfo(searchText: string) {
    let videosList: any = {}
    let videosIds: string[] = []
    let basicInfoRequest = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchText}&maxResults=10&part=snippet`
    let basicInfoResult: any = await fetch(basicInfoRequest)
    basicInfoResult = await basicInfoResult.json()
    if (basicInfoResult.items) {
        basicInfoResult.items.forEach((item: any) => {
            if (item.id.kind === "youtube#video") {
                let id = item.id.videoId
                let videoItem: Video = {
                    id: id,
                    publishedTime: item.snippet.publishTime,
                    channelTitle: item.snippet.channelTitle,
                    duration: null,
                    viewCount: null,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnailUrl: item.snippet.thumbnails.medium.url
                }
                videosList[id] = videoItem
                videosIds.push(id)
            }
        })
    }
    return { videosList, videosIds, totalResults: basicInfoResult.pageInfo.totalResults}
}
export function setSearchText(searchText: string) {
    return {
        type: SET_SEARCH_TEXT,
        payload: searchText
    }
}

export interface IfetchYoutubeSearchResult {
    type: 'SET_YOUTUBE_SEARCH_RESULT';
    payload: searchResult;
}
export interface IsetSearchText {
    type: 'SET_SEARCH_TEXT';
    payload: string;
}
export type YoutubeSearchActions = IfetchYoutubeSearchResult | IsetSearchText
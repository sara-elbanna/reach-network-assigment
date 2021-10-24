import { hideLoading, showLoading } from "react-redux-loading-bar"

export const SET_YOUTUBE_SEARCH_RESULT = 'SET_YOUTUBE_SEARCH_RESULT'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

const apiKey = 'AIzaSyD3RbjhotFgB3D8mt95IolfYMiaettAtXM'

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
export type Channel = {
    id: string,
    publishedTime: string,
    videosCount: string | null,
    subscribersCount: string | null,
    title: string,
    description: string,
    thumbnailUrl: string
}
export type searchResult = {
    totalResults: string,
    videos: Video[],
    channels: Channel[]
}
export function fetchYoutubeSearchResult(searchText: string) {
    return async (dispatch: any) => {
        dispatch(showLoading())
        let { videosList, videosIds, channelsList, channelsIds, totalResults } = await getBasicInfo(searchText)
        videosList = await getVideosDetails(videosIds, videosList)
        channelsList = await getChannelsDetails(channelsIds, channelsList)
        let searchResult = {
            totalResults: totalResults,
            videos: Object.values(videosList),
            channels: Object.values(channelsList)
        }
        dispatch({ type: SET_YOUTUBE_SEARCH_RESULT, payload: searchResult })
        dispatch(hideLoading())

    }
}

async function getBasicInfo(searchText: string) {
    let videosList: any = {}
    let channelsList: any = {}

    let videosIds: string[] = []
    let channelsIds: string[] = []

    let basicInfoRequest = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchText}&maxResults=20&part=snippet`
    let basicInfoResult: any = await fetch(basicInfoRequest)
    basicInfoResult = await basicInfoResult.json()
    console.log('basicInfoResult', basicInfoResult)
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
            else if (item.id.kind === 'youtube#channel') {
                let id = item.id.channelId
                let channelItem: Channel = {
                    id: id,
                    publishedTime: item.snippet.publishTime,
                    videosCount: null,
                    subscribersCount: null,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnailUrl: item.snippet.thumbnails.medium.url
                }
                channelsList[id] = channelItem
                channelsIds.push(id)
            }
        })
    }
    return { videosList, videosIds, channelsList, channelsIds, totalResults: basicInfoResult.pageInfo.totalResults }
}
async function getVideosDetails(videosIds:string[], videosList:any){
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
    return videosList
}

async function getChannelsDetails(channelsIds:string[], channelsList:any) {
    let commaSeparatedIds = channelsIds.toString()
    let channelsDetailsRequest = `https://www.googleapis.com/youtube/v3/channels?id=${commaSeparatedIds}&key=${apiKey}&part=contentDetails,statistics`
    let channelsDetailsResult: any = await fetch(channelsDetailsRequest)
    channelsDetailsResult = await channelsDetailsResult.json()
    if (channelsDetailsResult.items) {
        channelsDetailsResult.items.forEach((item: any) => {
            channelsList[item.id]['videosCount'] = item.statistics.videoCount
            channelsList[item.id]['subscribersCount'] = item.statistics.subscriberCount
        })
    }
    return channelsList
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
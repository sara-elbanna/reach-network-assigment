
import DesktopVideosHeader from "components/videosHeader/desktopVideosHeader";
import MobileVideosHeader from "components/videosHeader/mobileVideosHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchYoutubeSearchResult, searchResult as SearchResult, setSearchText, Video } from "store/actions/youtubeSearchActions";
import { AppState } from "store/reducers";
import VideoItemComponent from "./VideoItemComponent";
import './searchPage.scss'
import TailSpin from "react-loading-icons/dist/components/tail-spin";

function SearchPage() {
    const dispatch = useDispatch()
    const location = useLocation();
    let searchText = new URLSearchParams(location.search).get('query')

    const youtubeSearchResult: SearchResult | null = useSelector((state: AppState) => state.youtubeSearchResult.searchResult)
    console.log('youtubeSearchResult', youtubeSearchResult)

    useEffect(() => {
        if (searchText !== null) {
            dispatch(setSearchText(searchText))
            dispatch(fetchYoutubeSearchResult(searchText))
        }
    }, [searchText, dispatch])
    if (!searchText) return <div className='container'>no search text</div>
    if (youtubeSearchResult == null) return <div className='loading'>
        <TailSpin stroke='#ccc' speed={.75} />
        <p style={{ color: '#939191' }}>Loading</p>
    </div>
    else {
        return <div className='search-page'>
            <DesktopVideosHeader resultsCount={youtubeSearchResult.totalResults} />
            <MobileVideosHeader />
            <div className='search-page__result'>
                <div className='container'>
                    {youtubeSearchResult.videos.map((item: Video, index: number) => {
                        return <VideoItemComponent videoItem={item} key={index} />
                    })}
                </div>
            </div>
        </div>
    }

}

export default SearchPage
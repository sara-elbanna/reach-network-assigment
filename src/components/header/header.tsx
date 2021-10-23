// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSearchText } from "store/actions/youtubeSearchActions";
import { AppState } from "store/reducers";
import './header.scss'

function Header() {
    let history = useHistory();
    const dispatch = useDispatch()
    const searchText = useSelector((state: AppState) => state.youtubeSearchResult.searchText)

    function onSearchInputChange(searchText: string) {
        dispatch(setSearchText(searchText))
    }
    function onClickSearchButton() {
        history.push(`/search?query=${searchText}`)

    }
    return <div>
        <div className='header desktop'>
            <div className='container'>
                <div className='header__row '>
                    <div>
                        <img src='assets/images/youtube-full.svg' width='100' alt='youtube' />
                    </div>
                    <div>
                        <input value={searchText} onChange={(e) => onSearchInputChange(e.target.value)} />
                        <button className='header__search-btn' onClick={onClickSearchButton}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className='header mobile'>
            <div className='header__row'>
                <div>
                    <img src='assets/images/youtube.png' width='30' alt='youtube' />
                </div>
                <div>
                    <input value={searchText} onChange={(e) => onSearchInputChange(e.target.value)} />
                    <button className='header__search-btn' onClick={onClickSearchButton}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
}
export default Header
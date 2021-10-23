import './videosHeader.scss'
function DesktopVideosHeader(props:{resultsCount:string}) {
    let resultCountFormatted = props.resultsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return <div className='videos-header desktop'>
        <div className='container '>
            <div className='videos-header__row'>
                <div>
                    <span>About</span>&nbsp;
                    <span>{resultCountFormatted}</span>&nbsp;
                    <span>filtered results</span>
                </div>
                <div>
                    <img src='assets/images/filter.png' width='30' height='20'alt='filter' />
                    <button style={{margin: '0px 10px',backgroundColor: 'transparent',border: 'none'}}>
                        <span>FILTER</span>
                    </button>
                </div>
            </div>

        </div>

    </div>
}

export default DesktopVideosHeader
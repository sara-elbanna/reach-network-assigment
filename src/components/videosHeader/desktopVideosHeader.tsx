import './videosHeader.scss'
function DesktopVideosHeader() {
    return <div className='videos-header desktop'>
        <div className='container '>
            <div className='videos-header__row'>
                <div>
                    <span>About</span>&nbsp;
                    <span>13,000,000</span>&nbsp;
                    <span>filtered results</span>
                </div>
                <div>
                    <img src='assets/images/filter.png' width='30' height='20'alt='filter' />
                    <button style={{margin: '0px 10px',backgroundColor: '#fff',border: 'none'}}>
                        <span>FILTER</span>
                    </button>
                </div>
            </div>

        </div>

    </div>
}

export default DesktopVideosHeader
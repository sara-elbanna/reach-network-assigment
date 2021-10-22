import './header.scss'

function DesktopHeader() {
    return <div className='header desktop'>
        <div className='container'>
            <div className='header__row '>
                <div>
                    <img src='assets/images/youtube-full.svg' width='100' alt='youtube'/>
                </div>
                <div>
                    <input />
                    <button>
                        search
                    </button>
                </div>
            </div>

        </div>

    </div>
}

export default DesktopHeader
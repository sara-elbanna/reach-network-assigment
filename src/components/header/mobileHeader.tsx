import './header.scss'
function MobileHeader() {
    return <div className='header mobile'>
        <div className='header__row'>
            <div>
                <img src='assets/images/youtube.png' width='50' alt='youtube'/>
            </div>
            <div>
                <input />
                <button>
                    search
                </button>
            </div>
        </div>

    </div>
}

export default MobileHeader
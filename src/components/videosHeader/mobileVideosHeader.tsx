import './videosHeader.scss'
function MobileVideosHeader() {
    return <div className='videos-header mobile'>
        <div className='container '>
           <select>
               <option>All</option>
           </select>
           <select>
               <option>Any time</option>
           </select>
        </div>

    </div>
}

export default MobileVideosHeader
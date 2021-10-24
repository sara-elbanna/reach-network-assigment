import { Video } from "store/actions/youtubeSearchActions"
import { convertDateToTimeAgoFormat, convertNumberToKAndMFormat, convertVideoDurationToHoursAndMinsAndSeconds } from "utils"


function VideoItemComponent(props: { videoItem: Video }) {
    let formattedDuration = ''
    if (props.videoItem.duration) {
        formattedDuration = convertVideoDurationToHoursAndMinsAndSeconds(props.videoItem.duration)
    }
    return <div className='video-item' >
        <div className='video-item__thumbnail'>
            <span className='video-item__duration'>{formattedDuration}</span>
            <img src={props.videoItem.thumbnailUrl} alt='video' />
        </div>
        <div className='video-item__data' >
            <h3 data-testid={'video-title'} className='video-item__title'>{props.videoItem.title}</h3>
            <div className='video-item__metadat'>
                <span data-testid={'video-channel-title'}>{props.videoItem.channelTitle}</span><i className="fas fa-circle " style={{ fontSize: 5, marginLeft:5, marginRight:5 }}></i>
                <span data-testid={'video-views-count'}>{convertNumberToKAndMFormat(Number(props.videoItem.viewCount))} views</span>  <i className="fas fa-circle " style={{ fontSize: 5,marginLeft:5 , marginRight:5}}></i>
                <span data-testid={'video-published-date'} className='video-item__publish-date'>{convertDateToTimeAgoFormat(props.videoItem.publishedTime)}</span>
            </div>
            <p className='video-item__description desktop'>{props.videoItem.description}</p>
        </div>

    </div>

}

export default VideoItemComponent
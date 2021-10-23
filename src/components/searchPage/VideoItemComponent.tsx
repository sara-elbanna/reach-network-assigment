import { Video } from "store/actions/youtubeSearchActions"
import { convertVideoDurationToHoursAndMinsAndSeconds } from "utils"


function VideoItemComponent(props: { videoItem: Video }) {
    let formattedDuration = ''
    if (props.videoItem.duration) {
        formattedDuration = convertVideoDurationToHoursAndMinsAndSeconds(props.videoItem.duration)
    }
    console.log('formattedDuration', formattedDuration)

    return <div className='video-item' >
        <div className='video-item__thumbnail'>
            <span className='video-item__duration'>{formattedDuration}</span>
            <img src={props.videoItem.thumbnailUrl} alt='video' />
        </div>
        <div className='video-item__data' >
            <h3 className='video-item__title'>{props.videoItem.title}</h3>
            <div className='video-item__metadat'>
                <span>{props.videoItem.channelTitle}</span>&nbsp;<i className="fas fa-circle" style={{ fontSize: 5 }}></i>&nbsp;
                <span>{props.videoItem.viewCount} views</span>&nbsp;<i className="fas fa-circle" style={{ fontSize: 5 }}></i>
                {/* <span>{props.videoItem.viewCount}views.</span> */}
            </div>
            <p className='video-item__description desktop'>{props.videoItem.description}</p>
        </div>

    </div>

}

export default VideoItemComponent
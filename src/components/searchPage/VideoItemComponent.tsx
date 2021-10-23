import { Video } from "store/actions/youtubeSearchActions"


function VideoItemComponent(props: { videoItem: Video }) {
    return <div className='video-item' >
        <div className='video-item__thumbnail'>
            <img src={props.videoItem.thumbnailUrl} alt='video' />
        </div>
        <div className='video-item__data' >
            <h3 className='video-item__title'>{props.videoItem.title}</h3>
            <p className='video-item__description desktop'>{props.videoItem.description}</p>
        </div>

    </div>

}

export default VideoItemComponent
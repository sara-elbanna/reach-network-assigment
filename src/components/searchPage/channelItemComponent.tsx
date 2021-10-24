import { Channel } from "store/actions/youtubeSearchActions"
import { convertNumberToKAndMFormat } from "utils"


function ChannelItemComponent(props: { channelItem: Channel }) {
    return <div className='channel-item' >
        <div className='channel-item__thumbnail'>
            <img src={props.channelItem.thumbnailUrl} alt='channel' />
        </div>
        <div className='channel-item__data' >
            <h3 className='channel-item__title'>{props.channelItem.title}</h3>
            <div className='channel-item__metadat'>
                <span style={{display:'block'}}>{convertNumberToKAndMFormat(Number(props.channelItem.videosCount))} videos</span>
                <span>{convertNumberToKAndMFormat(Number(props.channelItem.subscribersCount))} subscribers</span>
            </div>
            <p className='channel-item__description desktop'>{props.channelItem.description}</p>
        </div>

    </div>

}

export default ChannelItemComponent
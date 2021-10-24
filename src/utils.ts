export function convertVideoDurationToHoursAndMinsAndSeconds(duration: string) {
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (match) {
        let res = match.slice(1).map((x) => {
            if (x != null) {
                return x.replace(/\D/, '');
            }
            return null
        });
        if (res) {
            let hours = (parseInt(match[0]) || 0);
            let minutes = (parseInt(match[1]) || 0);
            let seconds = (parseInt(match[2]) || 0);
            let durationInSeconds = hours * 3600 + minutes * 60 + seconds;
            let formattedDuration = getHoursAndMinutesAndSecondsFromSeconds(durationInSeconds)
            return formattedDuration
        }
    }
    return ''



}
function getHoursAndMinutesAndSecondsFromSeconds(val: number) { //HH:MM:SS
    let hours = parseInt(String(val / 3600), 10);
    let minutes = parseInt(String((val - hours * 3600) / 60), 10);
    let seconds = parseInt(String(val - minutes * 60 - hours * 3600), 10);

    let hoursString = (hours < 10 ? '0' + hours : hours).toString();
    let minutsString = (minutes < 10 ? '0' + minutes : minutes).toString();
    let secondsString = (seconds < 10 ? '0' + seconds : seconds).toString();
    let result = ''
    if (hours > 0) result += hoursString + ':'
    result += minutsString + ':'
    result += secondsString

    return result
}


export function convertNumberToKAndMFormat(number: number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return number;
}



function getDuration(seconds: any) {
    let epoch, interval;
    let DURATION_IN_SECONDS: any = {
        epochs: ['year', 'month', 'day', 'hour', 'minute'],
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    for (let i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
        epoch = DURATION_IN_SECONDS.epochs[i];
        interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
        if (interval >= 1) {
            return {
                interval: interval,
                epoch: epoch
            };
        }
    }

};

export function convertDateToTimeAgoFormat(date: string) {
    let nowDate: any = new Date()
    let convertedDate: any = new Date(date)

    let seconds: any = Math.floor((nowDate - convertedDate) / 1000)
    let duration: any = getDuration(seconds);
    let suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
    return duration.interval + ' ' + duration.epoch + suffix + ' ago';
};

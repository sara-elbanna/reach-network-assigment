export function convertVideoDurationToHoursAndMinsAndSeconds(duration: string) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (match) {
        let res = match.slice(1).map((x) => {
            if (x != null) {
                return x.replace(/\D/, '');
            }
            return null
        });
        if (res) {
            var hours = (parseInt(match[0]) || 0);
            var minutes = (parseInt(match[1]) || 0);
            var seconds = (parseInt(match[2]) || 0);
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
    if (hours > 0) result += hoursString +':'
    result += minutsString +':'
    result += secondsString

    return result
}
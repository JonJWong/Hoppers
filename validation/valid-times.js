
const validStartandEndTimes = function(startTime, endTime){
    // Check if start time and end time exists.
    if(startTime === undefined || endTime === undefined){return false}
    // Check that startime is greater than endtime and starttime is greater than current time.
    return (startTime.getTime() < endTime.getTime() && startTime.getTime() > Date.now() )
}

module.exports = validStartandEndTimes
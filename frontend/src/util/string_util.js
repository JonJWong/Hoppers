// const moment = require("moment")
var moment = require("moment-timezone");

export const getDate = (strDateTime) => {
  return moment(strDateTime).format("ddd, MMMM D, YYYY")
}

export const getTime = (strDateTime) => {
  return moment(strDateTime).format("h:mma z")
}

export const getTimeZone = (strDateTime) => {
  return moment(strDateTime).tz(moment.tz.guess()).format("z")
}
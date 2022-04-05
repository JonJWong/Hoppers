const moment = require("moment")

export const getDate = (strDateTime) => {
  return moment(strDateTime).format('YYYY-MM-DD')
}

export const getTime = (strDateTime) => {
  return moment(strDateTime).format('h:mm a')
}
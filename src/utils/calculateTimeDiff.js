// export const calculateTimeDiff = (bidTime) => {
//   var bidDate = new Date(bidTime);
//   var now = new Date();
//   var ms = Math.abs(now - bidDate);

//   var days = Math.floor(ms / (24 * 60 * 60 * 1000)); // days
//   var daysms = ms % (24 * 60 * 60 * 1000); // remaining ms after removing days
//   var hrs = Math.floor(daysms / (60 * 60 * 1000)); // hours
//   var hrsms = daysms % (60 * 60 * 1000); // remaining ms after removing hours
//   var mins = Math.floor(hrsms / (60 * 1000)); // minutes

//   if (days > 0) {
//       return days > 1 ? days + ' days ago' : '1 day ago';
//   } else if (hrs > 0) {
//       return hrs > 1 ? hrs + ' hrs ago' : '1 hr ago';
//   } else if (mins > 0) {
//       return mins > 1 ? mins + ' mins ago' : '1 min ago';
//   } else {
//       return 'just now';
//   }
// }

export const calculateTimeDiff = (bidTime) => {
  var bidDate = new Date(bidTime);
  var now = new Date();
  var ms = Math.abs(now - bidDate);

  if (ms >= 24 * 60 * 60 * 1000) {
    // If the time difference is more than or equal to 24 hours, return the formatted date
    return bidDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  } else {
    var days = Math.floor(ms / (24 * 60 * 60 * 1000)); // days
    var daysms = ms % (24 * 60 * 60 * 1000); // remaining ms after removing days
    var hrs = Math.floor(daysms / (60 * 60 * 1000)); // hours
    var hrsms = daysms % (60 * 60 * 1000); // remaining ms after removing hours
    var mins = Math.floor(hrsms / (60 * 1000)); // minutes

    if (days > 0) {
      return days > 1 ? days + ' days ago' : '1 day ago';
    } else if (hrs > 0) {
      return hrs > 1 ? hrs + ' hrs ago' : '1 hr ago';
    } else if (mins > 0) {
      return mins > 1 ? mins + ' mins ago' : '1 min ago';
    } else {
      return 'just now';
    }
  }
};

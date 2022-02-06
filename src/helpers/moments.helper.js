import moment from "moment";
import { getDecimal } from "./numbers.helper";

const displayFromNow = (m2String, isExtended = false) => {
  const m2 = moment(m2String, "YYYY-MM-DD HH:mm:ss");
  if (isExtended) return m2.fromNow();
  else {
    const diff = moment().diff(m2, "seconds");
    let count;
    let unit;
    let updateOn;

    // Within 10 seconds
    if (diff < 10) {
      return { output: "Now", updateOn: (10 - diff) * 1000 };
    }
    // Within 1 minute
    else if (diff < 60) {
      count = getDecimal(diff);
      unit = "s";
      updateOn = ((count + 1) * 10 - diff) * 1000;
    }
    // Within 1 hour
    else if (diff < 3600) {
      count = (diff / 60).toFixed(0);
      unit = "m";
      updateOn = (3600 - diff) * 1000;
    }
    // Within a day
    else if (diff < 86400) {
      count = (diff / 3600).toFixed(0);
      unit = "h";
      updateOn = (86400 - diff) * 1000;
    }
    // Within a week
    else if (diff < 604800) {
      count = (diff / 86400).toFixed(0);
      unit = "d";
      updateOn = (604800 - diff) * 1000;
    }
    // Within a month
    else if (diff < 2419200) {
      count = (diff / 604800).toFixed(0);
      unit = "w";
      updateOn = (2419200 - diff) * 1000;
    }
    // Within a year
    else if (diff < 31536000) {
      count = (diff / 2419200).toFixed(0);
      unit = "mo";
      updateOn = (31536000 - diff) * 1000;
    }
    // More than 1 year
    else {
      count = (diff / 31536000).toFixed(0);
      unit = "y";
      updateOn = ((count + 1) * 31536000 - diff) * 1000;
    }

    return {
      output: `${count}${unit}`,
      updateOn,
    };
  }
};

export { displayFromNow };

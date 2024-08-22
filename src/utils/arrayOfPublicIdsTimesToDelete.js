import moment from "moment";

export function arrayOfPublicIdsTimesToDelete() {
  const arr = [];

  for (let i = 24; i <= 48; i++) {
    const time = moment().subtract(i,"h").format()
    arr.push(time)
  }

  return arr
}



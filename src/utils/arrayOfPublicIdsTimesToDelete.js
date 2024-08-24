import moment from "moment";

export function arrayOfPublicIdsTimesToDelete() {
  const arr = [];

  for (let i = 0; i <= 36; i += 12) {
    const time = moment()
      .subtract(1, "d")
      .floor(12, "hours")
      .subtract(i, "h")
      .format();
    arr.push(time);
  }

  return arr;
}

import Constants from "./constants";

interface LocationFromZoneParams {
  zone: string;
}

export function getStateFromZone({ zone }: LocationFromZoneParams) {
  // Get state from passed zone, e.g. ['Johor']

  return Object.entries(Constants.locations).map(([state, value]: any) => {
    return Object.prototype.hasOwnProperty.call(value, zone) ? state : "";
  });
}

export function getLocationFromZone({ zone }: LocationFromZoneParams) {
  // Get array of location from passed zone, e.g. ['Pulau Aur']

  return Object.entries(Constants.locations).map(([state, value]: any) => {
    return Object.prototype.hasOwnProperty.call(value, zone) ? value[zone] : "";
  });
}

interface ConvertDateMonthDayParams {
  dateString: string;
}

export function convertDateMonthDay({ dateString }: ConvertDateMonthDayParams) {
  // return short date, e.g. Jun9
  let [day, month] = dateString.split("-");

  return `${month}${parseInt(day, 10)}`;
}

export function getFormattedDate() {
  // return date in full format, e.g. 09-Jun-2024

  //const currentDate = new Date(),
  const currentDate = getCurrentDate(),
    dd = String(currentDate.getDate()).padStart(2, "0"),
    month = currentDate.toLocaleString("en-US", { month: "short" }),
    year = currentDate.getFullYear(),
    formattedDate = `${dd}-${month}-${year}`;

  return formattedDate;
}

interface TimeString12hrParams {
  time: number;
}

export function timeString12hr({ time }: TimeString12hrParams) {
  // return readable time for PrayerTimeTable in H:MM AM/PM format
  // Param : time = 06:00:00

  return new Date("1970-01-01T" + time + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}

interface PrayerTimeZoneParams {
  zone: string;
}

export async function getPrayerTimeByZone({ zone }: PrayerTimeZoneParams) {
  const currentDate = getCurrentDate();
  const currentZone =
    zone === undefined ? Constants.defaultSettings.zone : zone;
  const allDatas = await import(
    `./prayertimes/${currentDate.getFullYear()}/${currentZone}.json`
  );

  const prayerTimeData = allDatas.default[0].prayerTime;
  let prayerTime: any = {};

  for (const key in prayerTimeData) {
    if (prayerTimeData[key].date === getFormattedDate()) {
      Object.assign(prayerTime, prayerTimeData[key]);
    }
  }

  return prayerTime;
}

interface ClosestPrayerTimeParams {
  filteredData: any;
}

export function getCurrentDate() {
  const currentDate = new Date();
  return currentDate;
}

export function getClosestPrayerTime({
  filteredData,
}: ClosestPrayerTimeParams) {
  // return closest prayer time with given time

  const currentDate = getCurrentDate(),
    currentTime = currentDate.getTime();

  // Convert each time value to timestamp and calculate the difference
  let closestTime = "";
  let minDifference = Infinity;
  for (const key in filteredData) {
    if (Object.hasOwnProperty.call(filteredData, key)) {
      const timeString = filteredData[key];
      const [hours, minutes, seconds] = timeString.split(/:| /);

      let time = getCurrentDate();
      time.setHours(hours);
      time.setMinutes(minutes);
      time.setSeconds(seconds);

      const timeValue = time.getTime();
      const difference = Math.abs(currentTime - timeValue);
      if (difference < minDifference) {
        minDifference = difference;
        closestTime = key;
      }
    }
  }
  return closestTime;
}

interface CheckedOnceParams {
  checkboxes: any;
}

export function checkedOnce({ checkboxes }: CheckedOnceParams) {
  checkboxes.forEach((checkbox: any) => {
    checkbox.addEventListener("change", function (this: HTMLInputElement) {
      if (this.checked) {
        checkboxes.forEach((cb: any) => {
          if (cb !== this) {
            cb.checked = false;
          }
        });
      }
    });
  });
}

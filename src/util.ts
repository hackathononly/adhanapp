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

  const currentDate = new Date(),
    dd = String(currentDate.getDate()).padStart(2, "0"),
    month = currentDate.toLocaleString("default", { month: "short" }),
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
  const currentZone =
    zone === undefined ? Constants.defaultSettings.zone : zone;
  const allDatas = await import(`./prayertimes/2024/${currentZone}.json`);
  //const allDatas = await import(`./prayertimes/2024/${zone}.json`);

  const prayerTimeData = allDatas.default[0].prayerTime;
  let prayerTime: any = {};

  for (const key in prayerTimeData) {
    if (prayerTimeData[key].date === getFormattedDate()) {
      Object.assign(prayerTime, prayerTimeData[key]);
    }
  }

  return prayerTime;
}

/*
export async function highlightClosestPrayerTime() {
  const { hijri, date, day, ...filteredObject } = await getPrayerTimeDatas();
  const closestTime = getClosestPrayerTime(filteredObject);

  const tds = [...document.querySelectorAll("td")];
  tds.map((td) => {
    if (td.innerHTML.includes(closestTime)) {
      td.closest("tr")?.classList.add("currentPrayerTime");
    }
  });
}
*/

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

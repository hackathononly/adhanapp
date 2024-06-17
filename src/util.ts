import Constants from "./constants.js";

export function getLocationFromZone(zone: any) {
  // get array of location from passed zone, e.g. ['Pulau Aur']

  return Object.entries(Constants.locations).map(([key, value]: any) => {
    return Object.prototype.hasOwnProperty.call(value, zone) ? value[zone] : "";
  });
}

export function convertDateMonthDay(dateString: any) {
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

export function timeString12hr(time24: any) {
  // return readable time for PrayerTimeTable in H:MM AM/PM format

  return new Date("1970-01-01T" + time24 + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}

export function getClosestPrayerTime(filteredObject: any) {
  // return closet prayer time with given time

  const currentDate = new Date(),
    currentTime = currentDate.getTime();

  // Convert each time value to timestamp and calculate the difference
  let closestTime: string = "";
  let minDifference = Infinity;
  for (const key in filteredObject) {
    if (Object.hasOwnProperty.call(filteredObject, key)) {
      const timeString = filteredObject[key];
      const [hours, minutes, seconds] = timeString.split(/:| /);
      let time = new Date();
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

export function handleChange() {
  // handle checkbox change for SelectDaerah

  if (localStorage.getItem("selectedZone") === null) {
    // has record
    const selectedZone = JSON.parse(localStorage.getItem("selectedZone"));
  } else {
    // no record
    localStorage.setItem(
      "selectedZone",
      JSON.stringify(this.getAttribute("data-zone")),
    );
  }
}

export function getZone() {
  // return zone from 3 source below:
  // 1. check localStorage
  // 2. check pathname from URL
  // 3. check constant defaultSettings

  const currentURL = new URL(window.location.href),
    pathname = currentURL.pathname,
    selectedZone = JSON.parse(localStorage.getItem("selectedZone")),
    zone = selectedZone
      ? selectedZone
      : pathname !== "/"
        ? decodeURI(pathname).split("/")[2].replace("/", "")
        : Constants.defaultSettings.zone;

  return zone;
}

export async function getPrayerTimeByZone() {
  return await import(`./prayertimes/2024/${getZone()}.json`);
}

export async function getPrayerTimeDatas() {
  const allDatas = await getPrayerTimeByZone();
  const prayerTimeData = allDatas.default[0].prayerTime;
  let prayerTime: any = {};

  for (const key in prayerTimeData) {
    if (prayerTimeData[key].date === getFormattedDate()) {
      Object.assign(prayerTime, prayerTimeData[key]);
    }
  }

  return prayerTime;
}

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

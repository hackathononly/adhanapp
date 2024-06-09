import Constants from "./constants.js";
import * as https from "https";

export function getFileName(dirname: any, zone: any) {
  return `${dirname}/${zone}.json`;
}

export async function fetchDatas(url: any) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  }).then((response: any) => {
    if (!("children" in response)) {
      throw new Error("Invalid response.");
    }
    return response.children;
  });
}

export function getZoneFromURL() {
  // get full URL and just filter out zone

  const currentURL = new URL(window.location.href),
    pathname = currentURL.pathname,
    zone =
      pathname !== "/"
        ? decodeURI(pathname).split("/")[2].replace("/", "")
        : Constants.defaultSettings.zone;

  return zone;
}

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
  return new Date("1970-01-01T" + time24 + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}

export function getClosestPrayerTime(filteredObject: any) {
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

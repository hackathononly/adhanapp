import MainData from "../src/prayertime/2024.json";
import Constants from "./constants.js";

export function downloadWaktuSolatByZone(zone: any) {
  const baseURL =
    "https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=year&zone=" +
    zone;
  return "hello";
}

export function getZoneFromURL() {
  const currentURL = new URL(window.location.href),
    pathname = currentURL.pathname,
    zone =
      pathname !== "/"
        ? decodeURI(pathname).split("/")[2].replace("/", "")
        : Constants.defaultSettings.zone;
  return zone;
}

export function getLocationFromZone(zone: any) {
  return Object.entries(Constants.locations).map(([key, value]: any) => {
    return Object.prototype.hasOwnProperty.call(value, zone) ? value[zone] : "";
  });
}

export function convertDateMonthDay(dateString: any) {
  let [day, month] = dateString.split("-");

  return `${month}${parseInt(day, 10)}`;
}

export function getWaktuSolat(zone: any) {
  const currentDate = new Date(),
    dd = String(currentDate.getDate()).padStart(2, "0"),
    month = currentDate.toLocaleString("default", { month: "short" }),
    year = currentDate.getFullYear(),
    formattedDate = `${dd}-${month}-${year}`;

  const findPrayerTimeByZoneAndDate = (data: any, zone: any, date: string) => {
    for (const row of data.rows) {
      if (row.zone === zone) {
        for (const prayerTime of row.prayerTime) {
          if (prayerTime.date === date) {
            return prayerTime;
          }
        }
      }
    }
    return null;
  };

  interface CurrentCity {
    zone: string;
  }

  const currentCity: CurrentCity = {
    zone: zone || Constants.defaultSettings.zone,
  };

  interface MainDatas {
    data: object;
  }

  const allWaktuSolat: MainDatas = {
    data: MainData.data.data[0],
  };

  return findPrayerTimeByZoneAndDate(
    allWaktuSolat.data,
    currentCity.zone,
    formattedDate,
  );
}

export const timeString12hr = (time24: any) => {
  return new Date("1970-01-01T" + time24 + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};

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

import MainData from "../public/prayertime/2024.json";
import Constants from "./constants.js";

export function convertDate(dateString: any) {
  // Split the input date string into components
  let [day, month] = dateString.split("-");

  // Define a mapping of month abbreviations to full month names
  const monthList: { [index: string]: any } = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  // Get the full month name
  let fullMonth = monthList[month];

  // Return the formatted date
  return `${fullMonth}${parseInt(day, 10)}`;
}

export function getWaktuSolat(cityCode: any) {
  const currentDate = new Date(),
    dd = String(currentDate.getDate()).padStart(2, "0"),
    month = currentDate.toLocaleString("default", { month: "long" }),
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
    code: string;
  }

  const currentCity: CurrentCity = {
    code: cityCode || Constants.defaultSettings.waktuSolatStateCode,
  };

  interface MainDatas {
    data: object;
  }

  const allWaktuSolat: MainDatas = {
    data: MainData.data.data[0],
  };

  return findPrayerTimeByZoneAndDate(
    allWaktuSolat.data,
    currentCity.code,
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

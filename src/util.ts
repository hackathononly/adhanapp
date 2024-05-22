import MainData from "../public/prayertime/2024.json";
import Constants from "./constants.js";

export function getWaktuSolat(cityCode: string) {
  interface Months {
    name: object;
  }

  const months: Months = {
    name: Constants.monthMalay,
  };

  const currentDate = new Date(),
    monthNames = Object.values(months.name),
    dd = String(currentDate.getDate()).padStart(2, "0"),
    month = monthNames[currentDate.getMonth() + 1],
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

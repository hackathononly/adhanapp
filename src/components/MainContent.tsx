import { useState, useEffect } from "react";
import { defaultWaktuSolatZone } from "../store";
import Constants from "../constants";

import RandomTazkirah from "./RandomTazkirah";
import PrayerTimeTable from "./PrayerTimeTable";
import MainContentFooter from "./MainContentFooter";
import {
  convertDateMonthDay,
  getPrayerTimeByZone,
  getLocationFromZone,
} from "../util";

type Props = {
  isIndex: boolean;
  currentZone: string;
};

export default function MainContent({ isIndex, currentZone }: Props) {
  const $defaultWaktuSolatZone = defaultWaktuSolatZone.get();

  const zone = isIndex
    ? $defaultWaktuSolatZone.zone || Constants.defaultSettings.zone
    : currentZone || Constants.defaultSettings.zone;

  /*
  interface PrayerTimeData {
    hijri: string;
    date: any;
    day: string;
  }
*/
  //let [prayerTimeData, getPrayerTimeData] = useState<PrayerTime[]>([]);
  //let [prayerTimeData, getPrayerTimeData] = useState([]);
  //let [prayerTimeData, getPrayerTimeData] = useState<any | null>(null);
  //let [prayerTimeData, getPrayerTimeData] = useState<any[]>([]);
  const [prayerTimeData, getPrayerTimeData] = useState({
    hijri: "",
    date: "",
    day: "",
  });

  useEffect(() => {
    const loadPrayerTimeData = async () => {
      try {
        await getPrayerTimeByZone({ zone: zone }).then((prayerTimeData: any) =>
          getPrayerTimeData(prayerTimeData),
        );
      } catch (error) {
        console.log("Error:", error);
      }
    };
    loadPrayerTimeData();
  }, []);

  const { hijri, date, day, ...data } = prayerTimeData;

  return prayerTimeData ? (
    <div className="nav pt-8 grid grid-cols-3 sm:grid-cols-12 lg:grid-cols-12 gap-10">
      <div className="relative p-4 col-span-3 sm:col-span-3 lg:col-span-3 sm:text-right lg:text-right">
        <h3 className="text-lg">{getLocationFromZone({ zone: zone })}</h3>
        <ul className="flexs pt-6 text-xs text-gray-400">
          <li className="w-full hidden">{hijri}</li>
          <li className="w-full2 pb-4">
            <a href="/" className="selectedFrequent">
              <span className="block pb-2">Today</span>
              {date ? convertDateMonthDay({ dateString: date }) : date}
              <br />
              {day}
            </a>
          </li>
          <li className={isIndex ? "hidden" : "w-full pb-4 text-gray-500"}>
            <a href="/month">Monthly</a>
          </li>
          <li className={isIndex ? "hidden" : "w-full pb-4 text-gray-500"}>
            <a href="/year">Yearly</a>
          </li>
        </ul>
        <MainContentFooter />
      </div>
      <div className="rounded-box border-2 col-span-3 sm:col-span-6 lg:col-span-6">
        <PrayerTimeTable data={data} />
      </div>
      <div className="p-4 col-span-3 sm:col-span-3 lg:col-span-3">
        <RandomTazkirah />
      </div>
    </div>
  ) : (
    ""
  );
}

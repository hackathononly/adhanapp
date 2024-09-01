import "../styles/PrayerTimeTable.scss";
import { timeString12hr, getClosestPrayerTime } from "../util";

type Props = {
  datas: Object;
};

export default function PrayerTimeTable({ datas }: Props) {
  const closestPrayerTime = getClosestPrayerTime({ filteredData: datas });

  const dummydata = {
    imsak: "00:00:00",
    fajr: "00:00:00",
    syuruk: "00:00:00",
    dhuhr: "00:00:00",
    asr: "00:00:00",
    maghrib: "00:00:00",
    isha: "00:00:00",
  };

  const data = Object.keys(datas).length == 0 ? dummydata : datas;

  return (
    <div className="overflow-x-auto">
      <table className="table rounded-none text-center">
        <thead className="uppercase">
          <tr id="header">
            <th>Waktu</th>
            <th>Masa</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([prayername, prayertime]) => (
            <tr
              key={prayername}
              className={
                closestPrayerTime == prayername ? "currentPrayerTime" : ""
              }
            >
              <td>{prayername}</td>
              <td>
                <time>{timeString12hr({ time: prayertime })}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import "../styles/PrayerTimeTable.scss";
import { timeString12hr, getClosestPrayerTime } from "../util";

type Props = {
  data: Object;
};

export default function PrayerTimeTable({ data }: Props) {
  const closetPrayerTime = getClosestPrayerTime({ filteredData: data });

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
                closetPrayerTime == prayername ? "currentPrayerTime" : ""
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

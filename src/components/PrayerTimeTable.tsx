import "../styles/PrayerTimeTable.scss";
import { timeString12hr } from "../util";

type Props = {
  data: Object;
};

export default function PrayerTimeTable({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table text-center overflow-hidden">
        <thead className="uppercase">
          <tr id="header">
            <th>Waktu</th>
            <th>Masa</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([prayername, prayertime]) => (
            <tr key={prayername}>
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

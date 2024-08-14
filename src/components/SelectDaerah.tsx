import { defaultWaktuSolatZone } from "../store";
import FavouriteLocation from "./FavouriteLocation";
import "../styles/animation.scss";

type Props = {
  zones: any;
  state: string;
  currentZone: string;
};

export default function SelectDaerah({ zones, state, currentZone }: Props) {
  const $defaultWaktuSolatZone = defaultWaktuSolatZone.get();
  return (
    <div id="daerahList">
      <div className="overflow-y-auto w-max">
        <div className="stats py-2 overflow-hidden -ml-5">
          {zones.map((zone: any) => (
            <div
              id={"zone-" + zone[0]}
              key={"zone-" + zone[0]}
              className="w-48 relative stat pt-0 pb-0"
            >
              <div className="stat-figure text-gray-400 bg-base-300">
                <FavouriteLocation defaultwaktusolatzone={zone[0]}>
                  <button
                    title={"Set " + zone[0] + " as default waktu solat zone"}
                    className="absolute bottom-0 left-6 z-50"
                    type="submit"
                  >
                    <input
                      className="defaultZoneCheckbox"
                      id={"toggle-heart_" + zone[0]}
                      data-zone={zone[0]}
                      type="checkbox"
                      defaultChecked={
                        $defaultWaktuSolatZone.zone == zone[0] ? true : false
                      }
                    />
                    <label
                      htmlFor={"toggle-heart_" + zone[0]}
                      aria-label="like"
                      className="inline-block w-2 h-2 stroke-current"
                    >
                      <span className="text-sm">♥</span>
                    </label>{" "}
                  </button>{" "}
                </FavouriteLocation>
              </div>
              <a className="pb-6" href={"/" + state + "/" + zone[0]}>
                <span
                  className={
                    "inline-block text-xs flex-initial break-words " +
                    (zone.indexOf(currentZone) == 0
                      ? "text-white"
                      : "text-gray-500")
                  }
                >
                  <b>{zone[0]}</b>
                  <br />
                  {zone[1]}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

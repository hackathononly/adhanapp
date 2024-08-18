import { defaultWaktuSolatZone } from "../store";
import { toast } from "react-hot-toast";
import { checkedOnce } from "../util";
import "../styles/animation.scss";

type Props = {
  zones: any;
  state: string;
  currentZone: string;
};

export default function SelectDaerah({ zones, state, currentZone }: Props) {
  const $defaultWaktuSolatZone = defaultWaktuSolatZone.get();
  const setDefaultWaktuSolatZone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = e.currentTarget.getAttribute("data-zone");
    const defaultZoneCheckbox = document.querySelectorAll(
      ".defaultZoneCheckbox",
    );
    checkedOnce({ checkboxes: defaultZoneCheckbox });
    defaultWaktuSolatZone.set({ zone: currentTarget });
    toast.success(
      <span>
        <b>{currentTarget}</b> is set as default waktu solat zone
      </span>,
      {
        position: "top-center",
      },
    );
  };
  return (
    <div id="daerahList">
      <div className="overflow-y-auto w-max">
        <div className="stats py-2 overflow-hidden -ml-5 bg-inherit">
          {zones.map((zone: any) => (
            <div
              id={"zone-" + zone[0]}
              key={"zone-" + zone[0]}
              className="w-48 relative stat pt-0 pb-0"
            >
              <div className="stat-figure text-gray-400 absolute bottom-0 z-50">
                <input
                  className="defaultZoneCheckbox"
                  id={"toggle-heart_" + zone[0]}
                  data-zone={zone[0]}
                  type="checkbox"
                  onChange={setDefaultWaktuSolatZone}
                  defaultChecked={
                    $defaultWaktuSolatZone.zone == zone[0] ? true : false
                  }
                />
                <label
                  htmlFor={"toggle-heart_" + zone[0]}
                  aria-label="like"
                  className="inline-block stroke-current"
                >
                  <span className="text-sm p-2">♥</span>
                </label>
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

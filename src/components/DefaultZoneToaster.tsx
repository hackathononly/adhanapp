import { useStore } from "@nanostores/react";
import { isDefaultZoneSelected, defaultWaktuSolatZone } from "../store";

export default function DefaultZoneToaster() {
  const $isDefaultZoneSelected = useStore(isDefaultZoneSelected);
  const $defaultWaktuSolatZone = useStore(defaultWaktuSolatZone);

  return $isDefaultZoneSelected ? (
    <>
      <div className="toast">
        <div className="alert alert-info">
          <span>
            <strong>{$defaultWaktuSolatZone}</strong> has been set as{" "}
            <a
              href="/"
              title="go to homepage"
              className="inline-block underline"
            >
              default waktu solat zone
            </a>
          </span>
        </div>
      </div>
    </>
  ) : null;
}

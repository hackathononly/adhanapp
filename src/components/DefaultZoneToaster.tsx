import { isDefaultZoneSelected, defaultWaktuSolatZone } from "../store";

export default function DefaultZoneToaster() {
  const $isDefaultZoneSelected = isDefaultZoneSelected.get();
  const $defaultWaktuSolatZone = defaultWaktuSolatZone.get();

  return $isDefaultZoneSelected ? (
    <>
      <div className="toast">
        <div className="alert alert-info">
          <span>
            <strong>{$defaultWaktuSolatZone.zone}</strong> has been set as{" "}
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

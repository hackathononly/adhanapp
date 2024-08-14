import Constants from "./constants";
import { persistentAtom } from "@nanostores/persistent";

interface DefaultWaktuSolatZone {
  zone: string;
}

export const defaultWaktuSolatZone = persistentAtom<DefaultWaktuSolatZone>(
  "defaultWaktuSolatZone",
  { zone: Constants.defaultSettings.zone },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

interface CollapseChecboxStatus {
  status: string;
}

export const collapseCheckboxStatus = persistentAtom<CollapseChecboxStatus>(
  "collapseCheckboxStatus",
  { status: Constants.defaultSettings.collapseCheckboxStatus },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

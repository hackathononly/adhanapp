import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

function setLocalStorage(label: string) {
  return persistentAtom<string>(label, "", {
    encode: JSON.stringify,
    decode(value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
  });
}

// default zone
export const isDefaultZoneSelected = atom(false);
export const defaultWaktuSolatZone = setLocalStorage("defaultWaktuSolatZone");

// checkbox
export const pow = setLocalStorage("pow");
//export const bbb = setLocalStorage("bbb");
export const isCollapseCheckboxChecked = atom(0);
export const collapseCheckboxStatus = setLocalStorage("collapseCheckboxStatus");

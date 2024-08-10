import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type { ReadableAtom, WritableAtom } from "nanostores";

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
export const collapseCheckboxStatus = setLocalStorage("collapseCheckboxStatus");

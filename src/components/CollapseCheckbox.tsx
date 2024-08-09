import SelectDaerah from "./SelectDaerah";
import { useStore } from "@nanostores/react";
import { collapseCheckboxStatus } from "../store";
import "../styles/CollapseCheckbox.scss";

type Props = {
  zones: [];
  state: string;
  currentZone: string;
  isIndex: boolean;
};

export default function CollapseCheckbox({
  zones,
  state,
  currentZone,
  isIndex,
}: Props) {
  const $collapseCheckboxStatus = useStore(collapseCheckboxStatus);
  // set initial state
  if ($collapseCheckboxStatus == "") {
    collapseCheckboxStatus.set("0");
  }

  function handleCheckbox(event: any) {
    if ("checked" in event.target) {
      const checkedStatus = event.target.checked ? 1 : 0;
      collapseCheckboxStatus.set(JSON.stringify(checkedStatus));
    }
  }

  return (
    <>
      {isIndex ? (
        <div className="collapse">
          <div className="collapse-title peer-checked:text-secondary-content"></div>
        </div>
      ) : (
        <div className="collapse collapse-arrow">
          <input
            className="peer"
            type="checkbox"
            defaultChecked={$collapseCheckboxStatus == "1" ? true : false}
            onChange={handleCheckbox}
          />
          <div className="collapse-title peer-checked:text-secondary-content"></div>
          <div className="p-0 collapse-content overflow-y-auto peer-checked:text-secondary-content">
            <SelectDaerah
              state={state}
              zones={zones}
              currentZone={currentZone}
            />
          </div>
        </div>
      )}
    </>
  );
}

import SelectDaerah from "./SelectDaerah";
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
  isIndex,
  currentZone,
}: Props) {
  const $collapseCheckboxStatus = collapseCheckboxStatus.get();

  function handleCheckbox(event: any) {
    if ("checked" in event.target) {
      const checkedStatus = event.target.checked ? "open" : "close";
      collapseCheckboxStatus.set({ status: checkedStatus });
    }
  }

  return (
    <>
      {isIndex ? (
        <div className="index collapse">
          <div className="collapse-title peer-checked:text-secondary-content"></div>
        </div>
      ) : (
        <div className="collapse collapse-arrow">
          <input
            className="peer"
            type="checkbox"
            defaultChecked={
              $collapseCheckboxStatus.status == "open" ? true : false
            }
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

import { isDefaultZoneSelected, defaultWaktuSolatZone } from "../store";
import { checkedOnce } from "../util";

type Props = {
  children: any;
  defaultwaktusolatzone: string;
};

export default function FavouriteLocation({
  children,
  defaultwaktusolatzone,
}: Props) {
  function setDefaultWaktuSolatZone(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const defaultZoneCheckbox = document.querySelectorAll(
      ".defaultZoneCheckbox",
    );
    checkedOnce({ checkboxes: defaultZoneCheckbox });
    isDefaultZoneSelected.set(true);
    defaultWaktuSolatZone.set(defaultwaktusolatzone);
  }

  return (
    <form id="favourite" onSubmit={setDefaultWaktuSolatZone}>
      {children}
    </form>
  );
}

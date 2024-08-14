import { toast } from "react-hot-toast";
import { defaultWaktuSolatZone } from "../store";
import { checkedOnce } from "../util";

type Props = {
  children: any;
  defaultwaktusolatzone: string;
};

export default function FavouriteLocation({
  children,
  defaultwaktusolatzone,
}: Props) {
  const setDefaultWaktuSolatZone = (
    e: React.FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    const defaultZoneCheckbox = document.querySelectorAll(
      ".defaultZoneCheckbox",
    );
    checkedOnce({ checkboxes: defaultZoneCheckbox });
    defaultWaktuSolatZone.set({ zone: defaultwaktusolatzone });
    toast.success(
      <span>
        <b>{defaultwaktusolatzone}</b> is set as default waktu solat zone
      </span>,
      {
        //position: "top-center",
        position: "bottom-right",
      },
    );
  };

  return (
    <form id="favourite" onSubmit={setDefaultWaktuSolatZone}>
      {children}
    </form>
  );
}

import { defaultWaktuSolatZone } from "../store";
import { getStateFromZone } from "../util";
import Constants from "../constants";

type Props = {
  isIndex: boolean;
  currentZone: string;
};

export default function SelectNegeri({ isIndex, currentZone }: Props) {
  const $defaultWaktuSolatZone = defaultWaktuSolatZone.get();
  const selectedZone = isIndex
    ? $defaultWaktuSolatZone.zone || Constants.defaultSettings.zone
    : currentZone;

  return (
    <>
      <button
        title="Select state"
        className="btn btn-ghost ml-2"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          (
            document.getElementById("negeriListModal") as HTMLFormElement
          ).showModal();
        }}
      >
        {getStateFromZone({ zone: selectedZone })}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          ></path>
        </svg>
      </button>
      <dialog id="negeriListModal" className="modal">
        <div className="z-10">
          <form method="dialog">
            <button title="Close modal box" className="btn btn-circle btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>
        </div>

        <div className="modal-box border rounded-box border-gray-700">
          <div className="drawer drawer-end auto-cols-auto">
            {Object.keys(Constants.locations).map((state: any) => (
              <div key={state}>
                <label
                  className="py-2 block text-xs"
                  htmlFor={"my-drawer-" + state}
                >
                  {state}
                </label>
                <input
                  id={"my-drawer-" + state}
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-side">
                  <label
                    htmlFor={"my-drawer-" + state}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  />
                  <ul className="bg-base-200 text-base-content min-h-full md:w-70 sm:w-96 lg:w-96 w-72 p-6">
                    {Object.keys((Constants.locations as any)[state]).map(
                      (zone) => (
                        <li key={zone}>
                          <a
                            className="text-xs py-2 block"
                            href={"/" + state + "/" + zone}
                          >
                            {(Constants.locations as any)[state][zone]}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}

import CollapseCheckbox from "./CollapseCheckbox";
import SelectNegeri from "./SelectNegeri";
import { defaultWaktuSolatZone } from "../store";

type Props = {
  zones: [];
  state: string;
  isIndex: boolean;
  currentZone: string;
};

export default function Navigation({
  zones,
  state,
  isIndex,
  currentZone,
}: Props) {
  const $defaultWaktuSolatZone = defaultWaktuSolatZone.get();
  const selectedZone = isIndex ? $defaultWaktuSolatZone.zone : currentZone;

  return (
    <nav className="sticky top-0 z-10">
      <section className="py-2 nav bg-base-100">
        <div className="absolute z-10">
          <div className="flex home">
            <a className="m-auto text-sm" href="/" title="back to home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-white"
                viewBox="0 0 48 48"
              >
                <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
              </svg>
            </a>
            <SelectNegeri isIndex={isIndex} currentZone={selectedZone} />
          </div>
        </div>
        <CollapseCheckbox
          isIndex={isIndex}
          zones={zones}
          state={state}
          currentZone={selectedZone}
        />
      </section>
    </nav>
  );
}

import * as fs from "fs";
import { getFileName, fetchDatas } from "../scripts/action.js";
import Constants from "../../constants.js";

async function fetchPrayerTimes(zone) {
  const baseURL =
    "https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=year&zone=" +
    zone;

  return fetchDatas(baseURL);
}

console.log("Syncing prayer times");

for (const state in Constants.locations) {
  const location = Constants.locations,
    zones = location[state];

  for (const zone in zones) {
    fetchPrayerTimes(zone).then((datas) => {
      const prayertimes = datas;

      console.log(`Fetched ${prayertimes} prayertimes`);

      // const filename = getFileName("../2024", zone);
      const filename = getFileName("./src/prayertimes/2024", zone);

      // if (!fs.existsSync(filename)) {
      //     console.log("Creating a new prayertime cache file for", filename);
      fs.writeFileSync(filename, JSON.stringify([prayertimes], null, 2));
      //     return;
      // }

      console.log("Done syncing prayer times");
    });
  }
}

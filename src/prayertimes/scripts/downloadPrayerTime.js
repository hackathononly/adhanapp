import * as fs from "fs";
import { getFileName, fetchDatas } from "./util";
import Constants from "./constants";

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
    fetchPrayerTimes(zone).then((prayertimes) => {
      console.log(`Fetched ${prayertimes.length} prayertimes`);

      prayertimes.forEach((prayertime) => {
        //const filename = getFileName("../src/prayertimes/2024", zone);
        const filename = getFileName("./prayertimes/2024/", zone);

        if (!fs.existsSync(filename)) {
          console.log("Creating a new prayertime cache file for", filename);
          fs.writeFileSync(filename, JSON.stringify([prayertime], null, 2));
          return;
        }

        /*
                const entries = JSON.parse(fs.readFileSync(filename).toString());
                const newEntries = entries
                  .filter((wm) => wm["wm-id"] !== webmention["wm-id"])
                  .concat([webmention]);
                newEntries.sort((a, b) => a["wm-id"] - b["wm-id"]);
                fs.writeFileSync(filename, JSON.stringify(newEntries, null, 2));
                if (entries.length !== newEntries.length) {
                  console.log("Wrote new mention to disk for", filename);
                }
        */
      });
      console.log("Done syncing prayer times");
    });
  }
}

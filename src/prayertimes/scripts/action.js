import * as https from "https";

export function getFileName(dirname, zone) {
  return `${dirname}/${zone}.json`;
}

export async function fetchDatas(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  }).then((response) => {
    if (!("children" in response)) {
      throw new Error("Invalid response.");
    }
    return response.children;
  });
}

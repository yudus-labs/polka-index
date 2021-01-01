const DB_URL =
  "https://raw.githubusercontent.com/yudus-labs/polka-index/main/resource/db.json";
const SETTING_URL =
  "https://raw.githubusercontent.com/yudus-labs/polka-index/main/resource/setting.json";

export async function fetchData(URL) {
  const response = await fetch(URL, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "text/plain",
      // "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(params), // body data type must match "Content-Type" header
  });
  return response.text(); // parses JSON response into native JavaScript objects
}

export async function getDB(params) {
  return await fetchData(DB_URL);
}

export async function getSetting(params) {
  return await fetchData(SETTING_URL);
}

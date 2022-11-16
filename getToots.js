const exp = require("constants");
const http = require("https");

const options = {
  "method": "GET",
  "hostname": "mastodon.world",
  "port": null,
  "path": "/api/v1/timelines/public?limit=5",
  "headers": {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();

export default function(getToots);
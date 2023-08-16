const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/lights", async function (req, res) {
  const { ip, username } = req.query;

  try {
    const bridgeResult = await axios.get(`http://${ip}/api/${username}/lights`);

    if (
      bridgeResult.data &&
      bridgeResult.data.length &&
      bridgeResult.data[0].error
    ) {
      throw new Error(bridgeResult.data[0].error.description);
    }

    return res.json({
      success: true,
      data: bridgeResult.data,
    });
  } catch (e) {
    console.error(e);

    return res.json({
      success: false,
    });
  }
});

app.put("/api/lights", async function (req, res) {
  const { ids, hue, ip, username } = req.body;

  for (let id of ids) {
    try {
      await axios.put(`http://${ip}/api/${username}/lights/${id}/state`, {
        on: true,
        hue,
        sat: 254,
        bri: 254,
      });
    } catch (e) {
      console.error(e);
    }
  }
  return res.end();
});

app.listen(3030, function () {
  console.log("Listening on port 3030");
});

const axios = require("axios");
const moment = require("moment"); // require

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const prayerData = async (req, res) => {
  const url =
    "https://www.islamicfinder.org/world/india/1265873/kozhikode-prayer-times/";

  const times = [];

  function timeConvert1(data) {
    var minutes = data % 60;
    var newMinutes = minutes.toString();

    //appending zero in one digit number
    if (newMinutes.length == 1) {
      newMinutes = "0" + newMinutes;
    } else {
      newMinutes = minutes;
    }

    var hours = (data - minutes) / 60;
    return hours + ":" + newMinutes;
  }

  try {
    const response = await axios.get(url);

    const { document } = new JSDOM(response.data).window;

    const fajarData = document
      .querySelector(".fajar-tile .prayertime")
      .textContent.split(" ")[0];

    const fajar = timeConvert1(
      moment.duration(fajarData).asMinutes() -
        moment.duration("0:06").asMinutes()
    );

    const fajarikamath = timeConvert1(
      moment.duration(fajar).asMinutes() + moment.duration("0:20").asMinutes()
    );

    const dhuhurData = document
      .querySelector(".dhuhar-tile .prayertime")
      .textContent.split(" ")[0];

    const dhuhur = timeConvert1(
      moment.duration(dhuhurData).asMinutes() +
        moment.duration("0:02").asMinutes()
    );

    const dhuhurikamath = timeConvert1(
      moment.duration(dhuhur).asMinutes() + moment.duration("0:20").asMinutes()
    );

    const asrData = document
      .querySelector(".asr-tile .prayertime")
      .textContent.split(" ")[0];

    const asr = timeConvert1(
      moment.duration(asrData).asMinutes() + moment.duration("0:01").asMinutes()
    );
    const asrikamath = timeConvert1(
      moment.duration(asr).asMinutes() + moment.duration("0:15").asMinutes()
    );
    const maghribData = document
      .querySelector(".maghrib-tile .prayertime")
      .textContent.split(" ")[0];

    const maghrib = timeConvert1(
      moment.duration(maghribData).asMinutes() +
        moment.duration("0:02").asMinutes()
    );

    const maghribikamath = timeConvert1(
      moment.duration(maghrib).asMinutes() + moment.duration("0:03").asMinutes()
    );

    const ishaData = document
      .querySelector(".isha-tile .prayertime")
      .textContent.split(" ")[0];

    const isha = timeConvert1(
      moment.duration(ishaData).asMinutes() +
        moment.duration("0:01").asMinutes()
    );
    const ishaikamath = timeConvert1(
      moment.duration(isha).asMinutes() + moment.duration("0:20").asMinutes()
    );

    times.push({
      Id: 1,
      Fajar: fajar.replace(/^0(?:0:0?)?/, ""),
      Dhuhar: dhuhur.replace(/^0(?:0:0?)?/, ""),
      Asr: asr.replace(/^0(?:0:0?)?/, ""),
      Maghrib: maghrib.replace(/^0(?:0:0?)?/, ""),
      Isha: isha.replace(/^0(?:0:0?)?/, ""),
      Fajarikamath: fajarikamath,
      Dhuharikamath: dhuhurikamath,
      Asrikamath: asrikamath,
      Maghribikamath: maghribikamath,
      Ishaikamath: ishaikamath,
    });
    res.json(times);
  } catch (error) {
    res.json(error);
  }
};

module.exports = prayerData;

//https://www.islamicfinder.org/world/india/1274987/kannur-prayer-times/
//https://www.islamicfinder.org/world/india/1264154/malappuram-prayer-times/

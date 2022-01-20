import axios from "axios";
import { apilinks, config } from "../constants.js";

import Postcl from "../Jobs/Postcl.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default class Worker {
  constructor() {
    this.name = config.name;
    this.work = true;
  }

  async checkForWork() {
    console.log("Checking For Work", apilinks.checkforwork);
    try {
      const res = await axios.post(apilinks.checkforwork, {
        name: config.name,
        version: config.version,
      });

      if (res.status === 200) {
        console.log("Res:", res.data.job);
        switch (res.data.job) {
          case "postcl":
            console.log("postingcl");
            await Postcl();
            break;
          case "sleep":
            console.log("Sleeping...");
            await delay(10000);
            break;
          default:
            console.log("Into Default, Not good!");
            break;
        }
      }
    } catch (error) {
      console.log("Err:", error);
    }
    console.log("Finish...3 sec sleep");
    await delay(3000);
  }
}

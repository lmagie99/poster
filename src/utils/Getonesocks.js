import { apilinks } from "../constants.js";
import Checksocks from "../utils/Checksocks.js";
import axios from "axios";
const Getonesocks = async () => {
  console.log("Getting One Good Socks...");
  try {
    const res = await axios.post(apilinks.getthreesocksusa);
    if (res.status === 200) {
      const socks = res.data[0];
      const checksocks = await Checksocks(socks.socks);

      if (!checksocks) return await Getonesocks();
      return socks;
    }
  } catch (error) {
    console.log(error);
    return await Getonesocks();
  }
};
export default Getonesocks;

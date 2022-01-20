import Getonesocks from "../utils/Getonesocks.js";
import Emailcreate from "../utils/Emailcreate.js";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Createhotmail = async () => {
  console.log("Creating hotmail...");
  const socks = await Getonesocks();
  const { email, browser } = await Emailcreate(socks);
  await delay(2000);
  return {
    email,
    browser,
    socks,
  };
};

export default Createhotmail;

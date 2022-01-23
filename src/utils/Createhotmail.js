import Getonesocks from "../utils/Getonesocks.js";
// import Emailcreate from "../utils/Emailcreatehotmail.js";
import Emailcreate from "../utils/Emailcreatetuta.js";
import Browser from "../utils/Browser.js";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Createhotmail = async () => {
  console.log("Creating hotmail...");
  const socks = await Getonesocks();
  console.log(socks.socks, socks.ip.timezone);
  const { browser, chrome } = await Browser(socks.socks, socks.ip.timezone);
  const { email } = await Emailcreate(browser.webSocketDebuggerUrl);
  await delay(60000);
  return {
    email,
    browser,
    socks,
  };
};

export default Createhotmail;

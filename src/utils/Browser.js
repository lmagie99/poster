import ChromeLauncher from "chrome-launcher";
import { execSync } from "child_process";
import axios from "axios";
const Browser = async (socks, timezone) => {
  const chrome = await ChromeLauncher.launch({
    startingUrl: "http://whoer.net",
    chromeFlags: [`--proxy-server=socks5://${socks}`],
  });
  execSync(`sudo timedatectl set-timezone ${timezone}`);
  const res = await axios.get(`http://127.0.0.1:${chrome.port}/json/version`);
  console.log(res.data);
  return {
    browser: res.data,
    chrome,
  };
};

export default Browser;

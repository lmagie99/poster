import Createhotmail from "../utils/Createhotmail.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Postcl = async () => {
  console.log("Posting Cl...");
  const { email, socks, browser } = await Createhotmail();
  // console.log(email, socks);
  console.log("Posting...");
  const clpage = await browser.newPage();
  await clpage.goto("http://craigslist.org");
  await clpage.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "platform", {
      get: () => "MacIntel",
    });
  });
  await clpage.goto("https://whoer.net/");
  await delay(25000);
};

export default Postcl;

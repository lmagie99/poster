import puppeteer from "puppeteer";
// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// puppeteer.use(StealthPlugin());
import faker from "@faker-js/faker";
import { randomDate, rndNumber, rndString } from "../utils/Utils.js";
import UserAgent from "user-agents";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const useragent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36";
const ug2 =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4426.0 Safari/537.36";
const ua3 =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.10 Safari/537.36";
const Emailcreate = async (socks) => {
  // const userAgent = new UserAgent({ platform: "Linux" });
  // console.log(userAgent);
  // await delay(10000);
  const wsChromeEndpointurl =
    "ws://127.0.0.1:9222/devtools/browser/b8ea58b2-2165-4baa-92ea-2f7ba4488278";

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: wsChromeEndpointurl,
      defaultViewport: null,
      devtools: true,
      // executablePath: "/usr/bin/chromium",
      // headless: false,
      slowMo: 400,
      // defaultViewport: null,
      // args: [
      //   `--proxy-server=socks5://${socks.socks}`,
      //   `--user-agent=${ua3}`,
      //   // "--start-fullscreen",
      // ],
    });
    const emailpage = await browser.newPage();
    // await emailpage.emulateTimezone(socks.ip.timezone);
    // await emailpage.evaluateOnNewDocument(() => {
    //   Object.defineProperty(navigator, "platform", {
    //     // get: () => "Win32",
    //     get: () => "MacIntel",
    //   });
    // });
    // // await emailemailpage.goto("https://i-know-you-faked-user-agent.glitch.me/");
    // await delay(5000);
    await emailpage.goto("https://duckduckgo.com/", {
      waitUntil: "networkidle2",
    });
    // document.querySelector("#search_form_input_homepage")

    await emailpage.waitForTimeout(2000);
    await emailpage.type("#search_form_input_homepage", "create outlook email");
    await emailpage.click("#search_button_homepage");
    await emailpage.waitForSelector("span.result__url__domain");

    await emailpage.evaluate(() => {
      Array.from(document.querySelectorAll("a > span.result__url__domain"))
        .filter((lk) => lk.innerText.includes("signup.live.com"))[0]
        .click();
    });
    // await delay(10000);
    // await emailpage.waitForSelector("#signup");
    // await emailpage.evaluate(() => document.querySelector("#signup").click());
    await emailpage.waitForTimeout(3000);
    await emailpage.waitForSelector("#liveSwitch");
    await emailpage.evaluate(() =>
      document.querySelector("#liveSwitch").click()
    );
    await emailpage.waitForTimeout(3000);
    await emailpage.waitForSelector("#MemberName");
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    console.log(firstName + " " + lastName);
    const makeemail = (
      firstName +
      lastName +
      rndString(4) +
      rndNumber(3)
    ).toLowerCase();
    await emailpage.type("#MemberName", makeemail);
    console.log("Email: ", makeemail);
    await emailpage.evaluate(() =>
      document.querySelector("#iSignupAction").click()
    );
    await emailpage.waitForTimeout(3000);
    await emailpage.waitForSelector("#PasswordInput");
    const makepassword =
      firstName + rndString(5) + rndNumber(4) + "$" + rndString(3);
    console.log("Pass: ", makepassword);
    await emailpage.type("#PasswordInput", makepassword);
    await emailpage.evaluate(() =>
      document.querySelector("#iSignupAction").click()
    );
    await emailpage.waitForTimeout(2000);
    await emailpage.waitForSelector("#identityBanner > div > div");
    const email = await emailpage.evaluate(
      () => document.querySelector("#identityBanner > div > div").innerText
    );
    console.log(email);
    await emailpage.type("#FirstName", firstName);
    await emailpage.waitForTimeout(2000);
    await emailpage.type("#LastName", lastName);
    await emailpage.waitForTimeout(3000);
    await emailpage.evaluate(() =>
      document.querySelector("#iSignupAction").click()
    );
    await emailpage.waitForSelector("#Country");
    await emailpage.waitForTimeout(3000);
    await emailpage.evaluate(() => {
      document.querySelector("#Country option:nth-child(244)").selected = true;
    });
    const DOB = randomDate("02/13/1970", "01/01/2000");
    await emailpage.waitForTimeout(2000);
    await emailpage.select("#BirthMonth", DOB.split("/")[0]);
    await emailpage.waitForTimeout(1000);
    await emailpage.select("#BirthDay", DOB.split("/")[1]);
    await emailpage.waitForTimeout(2000);
    await emailpage.type("#BirthYear", DOB.split("/")[2]);
    await emailpage.evaluate(() =>
      document.querySelector("#iSignupAction").click()
    );
    // await emailpage.waitForNavigation({ waitUntil: "networkidle2" });
    console.log("finishing", email, makeemail, makepassword);
    // await fs.appendFileSync(
    //   "emailuri.txt",
    //   `${email}:${makepassword}  ---  ${user.socks}\n`,
    //   "utf8"
    // );

    await emailpage.waitForTimeout(80000);

    return {
      email,
      browser,
    };
  } catch (error) {
    console.log(error);
  }
};

export default Emailcreate;

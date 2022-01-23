// import puppeteer from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import faker from "@faker-js/faker";
import { randomDate, rndNumber, rndString } from "../utils/Utils.js";
import UserAgent from "user-agents";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
// const useragent =
//   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36";
// const ug2 =
//   "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4426.0 Safari/537.36";
// const ua3 =
// "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36";

// const wsChromeEndpointurl =
// "ws://127.0.0.1:9222/devtools/browser/b8ea58b2-2165-4baa-92ea-2f7ba4488278";
const Emailcreate = async (wsChromeEndpointurl) => {
  // const userAgent = new UserAgent({ platform: "Linux" });
  // console.log(userAgent);
  // await delay(10000);
  try {
    const browser = await puppeteer.connect({
      // executablePath: "/usr/bin/chromium",
      //headless: false,
      browserWSEndpoint: wsChromeEndpointurl,
      defaultViewport: null,
      devtools: true,
      slowMo: 250,
      // defaultViewport: null,
      // args: [
      //   `--proxy-server=socks5://${socks.socks}`,
      //   `--user-agent=${ua3}`,
      // "--start-fullscreen",
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
    // await emailemailpage.goto("https://i-know-you-faked-user-agent.glitch.me/");
    // await delay(5000);
    //
    //
    //
    await emailpage.goto("https://mail.tutanota.com/signup", {
      waitUntil: "networkidle2",
    });
    await emailpage.waitForSelector(
      "#upgrade-account-dialog > div.flex.center-horizontally.wrap > div:nth-child(1) > div.buyOptionBox > div.button-min-height > button > div"
    );
    await emailpage.click(
      "#upgrade-account-dialog > div.flex.center-horizontally.wrap > div:nth-child(1) > div.buyOptionBox > div.button-min-height > button > div"
    );

    let pages = await browser.pages(); // get all open pages by the browser
    const popup = pages[pages.length - 1]; // the popup should be the last page opened
    // console.log(popup);
    await emailpage.waitForTimeout(3000);
    await popup.click(
      "#modal > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(1) > div > input[type=checkbox]"
    );

    await popup.click(
      "#modal > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > input[type=checkbox]"
    );
    await popup.click(
      "#modal > div:nth-child(2) > div > div > div > div.flex-center.dialog-buttons > button:nth-child(2) > div"
    );

    await emailpage.waitForSelector(
      "#signup-account-dialog > div > div.text-field.rel.overflow-hidden.text.pt > div > div > div > div.flex-grow.rel > input"
    );

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    console.log(firstName + " " + lastName);
    const makeemail = (
      firstName +
      // lastName +
      rndString(4) +
      rndNumber(3)
    ).toLowerCase();
    console.log("Email: ", makeemail);
    await emailpage.type(
      "#signup-account-dialog > div > div.text-field.rel.overflow-hidden.text.pt > div > div > div > div.flex-grow.rel > input",
      makeemail
    );
    await emailpage.click(
      "#signup-account-dialog > div > div:nth-child(2) > div:nth-child(1) > div.flex.flex-column > div > div > div.flex-grow > input.input"
    );
    await emailpage.waitForTimeout(3000);

    // pages = await browser.pages(); // get all open pages by the browser
    // const popup1 = pages[pages.length - 1]; // the popup should be the last page opened
    // console.log(popup1);
    // await popup.click(
    //   "#modal > div:nth-child(2) > div > div > div > div.flex-center.dialog-buttons > button > div > div"
    // );

    // #modal > div:nth-child(2) > div > div > div > div.flex-center.dialog-buttons > button > div > div
    const makepassword = rndString(5) + rndNumber(4) + "$" + rndString(3);
    console.log("Pass", makepassword);
    await emailpage.type(
      "#signup-account-dialog > div > div:nth-child(2) > div:nth-child(1) > div.flex.flex-column > div > div > div.flex-grow > input.input",
      makepassword
    );
    await emailpage.waitForTimeout(2000);
    await emailpage.type(
      "#signup-account-dialog > div > div:nth-child(2) > div:nth-child(3) > div.flex.flex-column > div > div > div > input",
      makepassword
    );
    await emailpage.waitForTimeout(5000);
    await emailpage.click(
      "#signup-account-dialog > div > div:nth-child(3) > div > input[type=checkbox]"
    );
    await emailpage.click(
      "#signup-account-dialog > div > div:nth-child(4) > div > input[type=checkbox]"
    );

    await emailpage.waitForTimeout(3000);
    // const [response] = await Promise.all([
    //   page.waitForNavigation(), // The promise resolves after navigation has finished
    //   page.click(
    //     "#signup-account-dialog > div > div:nth-child(4) > div > input[type=checkbox]"
    //   ), // Clicking the link will indirectly cause a navigation
    // ]);
    await emailpage.waitForSelector(
      "#signup-account-dialog > div > div.mt-l.mb-l > button > div > div"
    );

    await emailpage.click(
      "#signup-account-dialog > div > div.mt-l.mb-l > button > div > div"
    );

    await emailpage.waitForTimeout(30000);
    // await emailpage.goto("https://duckduckgo.com/", {
    //   waitUntil: "networkidle2",
    // });
    // // document.querySelector("#search_form_input_homepage")

    // await emailpage.waitForTimeout(2000);
    // await emailpage.type("#search_form_input_homepage", "create outlook email");
    // await emailpage.click("#search_button_homepage");
    // await emailpage.waitForSelector("span.result__url__domain");

    // await emailpage.evaluate(() => {
    //   Array.from(document.querySelectorAll("a > span.result__url__domain"))
    //     .filter((lk) => lk.innerText.includes("signup.live.com"))[0]
    //     .click();
    // });
    // // await delay(10000);
    // await emailpage.waitForSelector("#signup");
    // await emailpage.evaluate(() => document.querySelector("#signup").click());
    await emailpage.waitForTimeout(80000);

    return {
      email,
    };
  } catch (error) {
    console.log(error);
  }
};

export default Emailcreate;

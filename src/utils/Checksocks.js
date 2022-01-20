import axios from "axios";
import { execSync } from "child_process";
import { apiIp } from "../constants.js";

export default async function Checksocks(socks) {
  const command = `curl -H "Accept: application/json" -x socks5h://${socks} "${apiIp}"`;

  const data = JSON.parse(execSync(command, { timeout: 10000 }));

  if (data.status === "success") return true;
  return false;
}

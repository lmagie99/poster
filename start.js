import Worker from "./src/Worker/Worker.js";

const Start = async () => {
  const aWorker = new Worker();

  console.log("I just started Name:", aWorker.name);
  while (aWorker.work) {
    await aWorker.checkForWork();
  }
};

Start();

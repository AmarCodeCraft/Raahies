import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit(); // reuse the git instance

const markCommit = async (n) => {
  if (n === 0) {
    await git.push();
    console.log("✅ Push complete!");
    return;
  }

  const x = random.int(0, 54); // random week offset
  const y = random.int(0, 6);  // random day offset

  const date = moment()
    .subtract(1, "y")   // go back 1 year
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  console.log("📅 Commit Date:", date);

  jsonfile.writeFile(path, data, async () => {
    await git.add(path);
    await git.commit(date, undefined, { "--date": date });
    markCommit(n - 1);
  });
};

markCommit(100);

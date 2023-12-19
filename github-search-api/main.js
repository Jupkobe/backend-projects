const { Octokit, App } = require("octokit");

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

async function fetchData(firstDate, lastDate) {
  try {
    const result = await octokit.request(
      "GET /search/repositories?q=stars:>=0+created:{firstDate}..{lastDate}&sort=stars&order=desc",
      { firstDate, lastDate }
    );

    const filteredResult = result.data.items.map((item) => {
      return {
        name: item.full_name,
        url: item.html_url,
        "Star Count": item.stargazers_count,
      };
    });

    if (filteredResult.length === 0) throw new Error("No repository found.");
    console.log(filteredResult.length, "repositories found: ");
    console.log(filteredResult);
  } catch (error) {
    console.log(`Error! Status: ${error.status}.`);
  }
}

function main() {
  fetchData("2019-05-05", "2022-05-05");
}

main();

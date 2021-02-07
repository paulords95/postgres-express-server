const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

const file = fs.createReadStream("JBR_PF.txt");
const output = new stream();
const readLine = readline.createInterface(file, output);

let count = 0;

readLine.on("line", (line) => {
  if (line.toString().includes("Paulo")) {
    let data = line.split("|");
    const formattedLine =
      data[0] + "," + data[1] + "," + data[2] + "," + data[3];
    console.log(formattedLine);
  }

  const string = `INSERT INTO brstats.people_data (cpf, name , gender, birth_date) VALUES('0000', 'aaaaa', 'aaaa- aaa', to_date('DD/MM/YYYY', '28/05/1995'));`;
});

readLine.on("close", () => {});

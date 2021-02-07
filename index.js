const express = require("express");
const app = express();
const pool = require("./dbConnect");

const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

app.use(express.json());

app.get("/alldata", async (req, res) => {
  try {
    const allData = await pool.query("SELECT * FROM brstats.people_data");

    res.json(allData.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/insertnames", async (req, res) => {
  const file = fs.createReadStream("JBR_PF1.txt");
  const output = new stream();
  const readLine = readline.createInterface(file, output);

  let count = 0

  readLine.on("line", async (line) => {
    let data = line.split("|");
    const cpf = data[0];
    const name = data[1];
    const gender = data[2];
    const birthDate = data[3];

    const query =  `INSERT INTO brstats.people_data (cpf, name , gender, birth_date) VALUES('${cpf}', '${name}', '${gender}', to_date('${birthDate}', 'DD/MM/YYYY'))`
    try {
      const insertNames = await pool.query(query);
      count++

    } catch (error) {
      console.log(error.message);
    }

    console.log(count)
  });

  
readLine.on('close', () => {
  res.send('Terminado')
});
});

app.listen(1234, () => {
  console.log("Server running on port 1234");
});

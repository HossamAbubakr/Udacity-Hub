import express from "express";
import client from "./database";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const connection = await client.connect();
  const query = "SELECT * FROM students"
  const results = await connection.query(query);
  connection.release();
  res.send(results.rows);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

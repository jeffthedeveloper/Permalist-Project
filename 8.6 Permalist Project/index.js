import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const filter = req.query.filter || "all";
    let query = "SELECT * FROM items ORDER BY id ASC";
    if (filter !== "all") {
      query = `SELECT * FROM items WHERE category = '${filter}' ORDER BY priority DESC, id ASC`;
    }
    const result = await db.query(query);
    const items = result.rows; 

    res.render("index.ejs", {
      listTitle: "Objetivos da Semana",
      listItems: items,
      filter: filter,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const { newItem, estimatedTime, priority, category } = req.body;
  try {
    await db.query(
      "INSERT INTO items (title, estimated_time, priority, category, completed) VALUES ($1, $2, $3, $4, false)",
      [newItem, estimatedTime, priority, category]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const { updatedItemTitle, updatedItemId, updatedEstimatedTime, updatedPriority, updatedCategory } = req.body;
  try {
    await db.query(
      "UPDATE items SET title = $1, estimated_time = $2, priority = $3, category = $4 WHERE id = $5",
      [updatedItemTitle, updatedEstimatedTime, updatedPriority, updatedCategory, updatedItemId]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/complete", async (req, res) => {
  const id = req.body.completeItemId;
  try {
    await db.query("UPDATE items SET completed = true WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

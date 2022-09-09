const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../db");

app.get("/graduates/:id/offers", async (req, res, next) => {
  try {
    // Get the specific graduate based on the id in the URL
    const graduate = await db.query("SELECT * FROM graduates WHERE id=$1", [
      req.params.id,
    ]);
    // Get all the offers where the graduate_id is the same as on the one in the URL
    const offers = await db.query(
      "SELECT company,title FROM offers WHERE graduate_id=$1",
      [req.params.id]
    );
    graduate.rows[0].offers = offers.rows;
    return res.json(graduate.rows[0]);
  } catch (e) {
    return next(e);
  }
});

// Add another route/endpoint to add an offer for a specific grad
app.post("/graduates/:id/offers", async (req, res, next) => {
  try {
    const graduate = await db.query(
      "INSERT INTO offers (company, title, graduate_id) VALUES ($1, $2, $3)",
      [req.body.company, req.body.title, req.params.id]
    );
    return res.json({ message: "Created" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;

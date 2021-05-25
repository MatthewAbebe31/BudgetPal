require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/purchases', (req, res) => {
  const sql = `
    select *
      from "purchases"
     order by "purchaseId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

let purchaseId = 0;

app.post('/api/purchases', (req, res) => {
  const id = purchaseId++;

  const { category, description, amount, date } = req.body;
  if (!category || !description || !amount || !date) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    insert into "purchases" ("id", "category", "description", "amount", "date")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [id, category, description, amount, date];
  db.query(sql, params)
    .then(result => {
      const [purchase] = result.rows;
      res.status(201).json(purchase);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on ${process.env.PORT}`);
});

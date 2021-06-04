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
     order by "date" desc
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

app.get('/api/purchases/countPurchases', (req, res) => {
  const sql = `
    select count("purchaseId"), "date"
      from "purchases"
     group by "date"
     order by "date" desc
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

app.get('/api/purchases/amount', (req, res) => {
  const sql = `
    select "date", sum("amount") as amount
      from "purchases"
     group by "date"
     order by "date" desc
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

app.get('/api/purchases/categorySpending', (req, res) => {
  const sql = `
    select sum("amount") as amount, "category"
      from "purchases"
     group by "category"
     order by "category" desc
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

app.get('/api/purchases/countPurchasesByCategory', (req, res) => {
  const sql = `
    select count("purchaseId") as purchases, "category"
      from "purchases"
     group by "category"
     order by "category" desc
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

app.get('/api/categories', (req, res) => {
  const sql = `
    select *
      from "categories"
     order by "categoryId" desc
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

app.get('/api/notes', (req, res) => {
  const sql = `
    select *
      from "notes"
     order by "noteId" desc
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

app.post('/api/purchases', (req, res) => {

  const { category, description, amount } = req.body;
  if (!category || !description || !amount) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    insert into "purchases" ("category", "description", "amount")
    values ($1, $2, $3)
    returning *
  `;
  const params = [category, description, amount];
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

app.post('/api/categories', (req, res) => {

  const { categoryName, categoryAmount } = req.body;
  if (!categoryName || !categoryAmount) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    insert into "categories" ("categoryName", "categoryAmount")
    values ($1, $2)
    returning *
  `;
  const params = [categoryName, categoryAmount];
  db.query(sql, params)
    .then(result => {
      const [category] = result.rows;
      res.status(201).json(category);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/notes', (req, res) => {

  const { category, note } = req.body;
  if (!category || !note) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    insert into "notes" ("category", "note")
    values ($1, $2)
    returning *
  `;
  const params = [category, note];
  db.query(sql, params)
    .then(result => {
      const [category] = result.rows;
      res.status(201).json(category);
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

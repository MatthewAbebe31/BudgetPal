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

app.get('/api/categories', (req, res) => {
  const sql = `
    select "categoryId", "categoryName", "categoryAmount", sum("amount") as "totalSpent"
      from "categories"
      left join "purchases" using ("categoryId")
      group by "categoryId", "categoryName", "categoryAmount"
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

app.get('/api/purchases', (req, res) => {
  const sql = `
    select *
      from "purchases"
     order by "purchaseId" desc
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

app.get('/api/categories/categoryBudget', (req, res) => {
  const sql = `
    select sum("categoryAmount") as categoryAmount, "categoryName"
      from "categories"
     group by "categoryName"
     order by "categoryName" desc
  `;

  const secondSql = `
    select sum("amount") as "totalSpent", "category" as "x"
      from "purchases"
      join "categories" on ("category" = "categoryName")
     group by "category"
     order by "category" desc
  `;

  Promise.all([
    db.query(sql),
    db.query(secondSql)
  ]).then(results => {
    res.status(200).json(results);
  })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
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

  const { categoryId, category, description, amount } = req.body;
  if (!categoryId || !category || !description || !amount) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    insert into "purchases" ("categoryId", "category", "description", "amount")
    values ($1, $2, $3, $4)
    returning *
  `;

  const params = [categoryId, category, description, amount];
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
      const [note] = result.rows;
      res.status(201).json(note);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.put('/api/categories', (req, res) => {

  const { categoryId, categoryName, categoryAmount } = req.body;

  if (!categoryId || !categoryName || !categoryAmount) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    update "categories"
    set    "categoryName"   = $1,
           "categoryAmount" = $2
    where  "categoryId"     = $3
    returning *
  `;
  const params = [categoryName, categoryAmount, categoryId];
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

app.put('/api/purchases', (req, res) => {

  const { purchaseId, category, description, amount } = req.body;

  if (!purchaseId || !category || !description || !amount) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    update "purchases"
    set    "category"   = $1,
           "description" = $2,
           "amount" = $3
    where  "purchaseId"     = $4
    returning *
  `;
  const params = [category, description, amount, purchaseId];
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

app.put('/api/notes', (req, res) => {

  const { noteId, category, note } = req.body;

  if (!noteId || !category || !note) {
    res.status(400).json({
      error: 'Please enter required fields'
    });
    return;
  }
  const sql = `
    update "notes"
    set    "category"   = $1,
           "note" = $2
    where  "noteId"     = $3
    returning *
  `;
  const params = [category, note, noteId];
  db.query(sql, params)
    .then(result => {
      const [note] = result.rows;
      res.status(201).json(note);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.delete('/api/categories/:categoryId', function (req, res, next) {
  const categoryId = parseInt(req.params.categoryId);
  const sql = `
    delete from "categories"
    where "categoryId" = $1
    returning *
  `;
  const secondSql = `
    delete from "purchases"
    where "categoryId" = $1
    returning *
  `;
  const params = [categoryId];

  Promise.all([
    db.query(sql, params),
    db.query(secondSql, params)
  ]).then(result => {
    res.sendStatus(204);
  })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.delete('/api/purchases/:purchaseId', function (req, res, next) {
  const purchaseId = parseInt(req.params.purchaseId);

  const sql = `
    delete from "purchases"
    where "purchaseId" = $1
    returning *
  `;

  const params = [purchaseId];

  db.query(sql, params)
    .then(result => {
      const data = result.rows[0];
      res.status(204).json(data);
    })
    .catch(err => {
      next(err);
    });
});

app.delete('/api/notes/:noteId', function (req, res, next) {
  const noteId = parseInt(req.params.noteId);

  const sql = `
    delete from "notes"
    where "noteId" = $1
    returning *
  `;

  const params = [noteId];

  db.query(sql, params)
    .then(result => {
      const data = result.rows[0];
      res.status(204).json(data);
    })
    .catch(err => {
      next(err);
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on ${process.env.PORT}`);
});

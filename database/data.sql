insert into "categories" ("categoryId", "categoryName", "categoryAmount")
values (1, 'Rent', 900.00),
       (2, 'Automotive', 500.00),
       (3, 'Food', 300.00),
       (4, 'Utilities', 200.00);

insert into "purchases" ("purchaseId", "categoryId", "category", "description", "amount", "date")
values (1, 1, 'Rent', 'Paid apartment rent.', 900.00, '2021-07-01T00:00:00Z'),
       (2, 4, 'Utilities', 'Paid water, gas, and electric bills.', 225.00, '2021-07-07T00:00:00Z'),
       (3, 3, 'Food', 'Groceries.', 100.00, '2021-07-07T00:00:00Z'),
       (4, 2, 'Automotive', 'Paid car note.', 200.00, '2021-07-13T00:00:00Z'),
       (5, 3, 'Food', 'Groceries', 125.00, '2021-07-13T00:00:00Z'),
       (6, 2, 'Automotive', 'Replace front tires', 150.00, '2021-07-26T00:00:00Z'),
       (7, 3, 'Food', 'Groceries', 50.00, '2021-07-26T00:00:00Z');

insert into "notes" ("noteId", "categoryId", "category", "note", "date")
values (1, 4, 'Utilities', 'Over budget on utilities.', '2021-07-07T00:00:00Z'),
       (2, 3, 'Food', 'Under budget on food.', '2021-07-26T00:00:00Z')

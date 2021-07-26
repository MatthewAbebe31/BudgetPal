insert into "categories" ("categoryName", "categoryAmount")
values ('Rent', 900.00),
       ('Automotive', 500.00),
       ('Food', 300.00),
       ('Utilities', 200.00);

insert into "purchases" ("categoryId", "description", "amount", "date")
values (1, 'Paid apartment rent.', 900.00, '2021-07-01T00:00:00Z'),
       (4, 'Paid water, gas, and electric bills.', 225.00, '2021-07-07T00:00:00Z'),
       (3, 'Groceries.', 100.00, '2021-07-07T00:00:00Z'),
       (2, 'Paid car note.', 200.00, '2021-07-13T00:00:00Z'),
       (3, 'Groceries', 125.00, '2021-07-13T00:00:00Z'),
       (2, 'Replace front tires', 150.00, '2021-07-26T00:00:00Z'),
       (3, 'Groceries', 50.00, '2021-07-26T00:00:00Z');

insert into "notes" ("categoryId", "category", "note", "date")
values (4, 'Utilities', 'Over budget on utilities.', '2021-07-07T00:00:00Z'),
       (3, 'Food', 'Under budget on food.', '2021-07-26T00:00:00Z')

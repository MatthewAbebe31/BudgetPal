# Budget-Pal

<h4>Description</h4>

A full stack React application that tracks purchases and analyzes spending habits.

<h4>Technologies</h4>

<p float="left">
<img alt="HTML5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png" width="90" height="90" />
<img alt="CSS3" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" width="90" height="90" />
<img alt="JavaScript" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" width="90" height="90" />
<img alt="Node.js" src="https://cdn.iconscout.com/icon/free/png-512/node-js-1-1174935.png" width="90" height="90" />
<img alt="Express.js" src="https://camo.githubusercontent.com/19012171c9664630527c09ac9045b05b50cd03088d6ed8a9664d6e1fa4aeb89c/68747470733a2f2f616d616e646565706d697474616c2e67616c6c65727963646e2e76736173736574732e696f2f657874656e73696f6e732f616d616e646565706d697474616c2f657870726573736a732f322e302e302f313530393838313239333837322f4d6963726f736f66742e56697375616c53747564696f2e53657276696365732e49636f6e732e44656661756c74" width="140" height="90" />
<img alt="PostgreSQL" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" width="90" height="90" />
<img alt="ReactJS" src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" width="90" height="90" />
<img alt="Bootstrap" src="https://cdn.worldvectorlogo.com/logos/bootstrap-4.svg" width="90" height="90" />
</p>

<h4>Features</h4>

* Budget-Pal allows users to categorize and track their expenditures as well as examine charts related to spending activity.
* Budget-Pal is a useful application for people that want to improve their budgeting skills.
* Users can create budgeting categories and record their purchases.
* Users can assess their spending habits by viewing charts and make notes related to their budget.
* Future feature: Create alerts associated with budgeting goals.

<h4>Live Demo</h4>

Try the application live at https://budget-pal-app.herokuapp.com/

<h4>Installation</h4>

 1. Clone the repository.

```
git clone https://github.com/Matthew-Abebe/Budget-Pal.git

cd Budget-Pal
```

2. Make a copy of .env.example named .env.

```
cp .env.example .env
```

3. Install all dependencies with npm install

```
npm install
```

4. Start ```postgresql```.

```
sudo service postgresql start
```

5. Create a database.

```
createdb [database-name]
```
 * To view database ```pgweb --db=[database-name]```.
 Then visit ```http://localhost:8081```

6. Import database schema.

```
npm run db:import
```

5. Open a new console and start the Express API server.

```
npm run dev
```

6. View application at ```localhost:3000```.

<h4>How to Use</h4>

* Select the Categories option on the navbar and enter information into the required fields to create a category.
* Select the Purchases option on the navbar and enter information into the required fields to create a purchase.
* View charts related to your budget by choosing the Analysis option on the navbar.
* Select the Notes option on the navbar and enter information into the required fields to create a note pertaining to your budget.



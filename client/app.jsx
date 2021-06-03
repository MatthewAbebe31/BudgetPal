import React from 'react';
import Navbar from './pages/navbar';
import CategoryList from './pages/category-list';
import CategoryForm from './pages/category-form';
import PurchaseList from './pages/purchase-list';
import PurchaseForm from './pages/purchase-form';
import Analysis from './pages/analysis';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      categories: [],
      route: parseRoute(window.location.hash)
    };
    this.addPurchase = this.addPurchase.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
    this.getAllPurchases();
    this.getAllCategories();
  }

  getAllPurchases() {
    fetch('/api/purchases')
      .then(response => response.json())
      .then(data => this.setState({ purchases: data }));
  }

  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));
  }

  addPurchase(newPurchase) {

    fetch('/api/purchases', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPurchase)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ purchases: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  addCategory(newCategory) {

    fetch('/api/categories', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'categories') {
      return <CategoryList/>;
    }
    if (route.path === 'purchases') {
      return <PurchaseList />;
    }
    if (route.path === 'addNewPurchases') {
      return <PurchaseForm onSubmit={this.addPurchase} />;
    }
    if (route.path === 'addNewCategories') {
      return <CategoryForm onSubmit={this.addCategory} />;
    }
    if (route.path === 'analysis') {
      return <Analysis />;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        { this.renderPage()}
      </>
    );
  }
}

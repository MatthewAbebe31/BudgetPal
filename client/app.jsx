import React from 'react';
import Navbar from './pages/navbar';
import PurchaseList from './pages/purchase-list';
import PurchaseForm from './pages/purchase-form';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      route: parseRoute(window.location.hash)
    };
    this.addPurchase = this.addPurchase.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
    this.getAllPurchases();
  }

  getAllPurchases() {
    fetch('/api/purchases')
      .then(response => response.json())
      .then(data => this.setState({ purchases: data }));
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

  renderPage() {
    const { route } = this.state;
    if (route.path === 'purchases') {
      return <PurchaseList />;
    }
    if (route.path === 'addNewPurchases') {
      return <PurchaseForm onSubmit={this.addPurchase}/>;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        { this.renderPage() }
       </>
    );
  }
}

import React from 'react';
import PurchaseForm from './pages/purchase-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: []
    };
    this.addPurchase = this.addPurchase.bind(this);
  }

  componentDidMount() {
    this.getAllPurchases();
  }

  getAllPurchases() {
    fetch('/api/purchases')
      .then(response => response.json())
      .then(data => this.setState({ purchases: data }));
  }

  addPurchase(newPurchase) {
    const newDataArr = [];

    fetch('/api/purchases', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPurchase)
    })
      .then(response => response.json())
      .then(data => {
        this.state.purchases.push(data);
        for (let i = 0; i < this.state.purchases.length; i++) {
          newDataArr.push(this.state.purchases[i]);
          console.log(newDataArr);
        }
        this.setState({ purchases: newDataArr });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col pt-5">
            <PurchaseForm onSubmit={this.addPurchase} />
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';

class PurchaseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: []
    };
  }

  componentDidMount() {
    fetch('/api/purchases')
      .then(res => res.json())
      .then(data => this.setState({ purchases: data }));
  }

  render() {

    return (
    // <div id="purchase-list-header">
    //   <h2>Purchases</h2>
    // </div>

      this.state.purchases.map(purchase =>
      <div key={purchase.purchaseId}>
        <div className="purchase-list-container">
        <div className="card text-dark bg-info mb-3">
          <div className="card-header">{purchase.category}</div>
            <div className="card-body">
              <h5 className="card-title">{purchase.description}</h5>
                <p className="card-text">{purchase.amount}</p>
                <p className="card-text">{purchase.date}</p>
            </div>
          </div>
        </div>
        </div>
      )
    );
  }
}

export default PurchaseList;

import React from 'react';
import { format } from 'date-fns';

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
      <div>
        <div id="purchase-list-header">
          <h2 id="purchases-header">Purchases</h2>
        </div>

        {
          this.state.purchases.map(purchase => {
            const date = purchase.date;
            const dateFormatted = format(new Date(date), 'MM/dd/yyyy');
            return (
              <div key={purchase.purchaseId}>
                <div className="purchase-list-container">
                  <div className="card text-dark bg-info mb-3">
                    <div className="card-header">{purchase.category}</div>
                    <div className="card-body">
                      <h5 className="card-title">{purchase.description}</h5>
                      <p className="card-text">${purchase.amount}</p>
                      <p className="card-text">{dateFormatted}</p>
                      <div id="purchases-edit-delete-button-container">
                        <button type="button" className="btn btn-link">Edit</button>
                        <button type="button" className="btn btn-link">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
        <div id="add-new-purchase-button-container">
          <a href="#addNewPurchases">
            <button type="button" className="btn btn-success">Add New Purchase</button>
          </a>
        </div>
      </div >
    );
  }
}

export default PurchaseList;

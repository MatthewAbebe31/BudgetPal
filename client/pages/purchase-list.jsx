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
          <h2 className="text-center mt-3 text-decoration-underline">Purchases</h2>
        {
          this.state.purchases.map(purchase => {
            const date = purchase.date;
            const dateFormatted = format(new Date(date), 'MM/dd/yyyy');
            return (
              <div key={purchase.purchaseId}>
                <div className="d-flex justify-content-center">
                  <div className="card text-dark bg-light mb-3">
                    <div className="card-header">{purchase.category}</div>
                    <div className="card-body">
                      <h5 className="card-title">{purchase.description}</h5>
                      <p className="card-text">${purchase.amount}</p>
                      <p className="card-text">{dateFormatted}</p>
                      <div className="purchases-edit-delete-button-container d-flex justify-content-end">
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
        <div className="add-new-purchase-button-container d-flex justify-content-center">
          <a href="#addNewPurchases">
            <button type="button" className="btn btn-success">Add New Purchase</button>
          </a>
        </div>
      </div >
    );
  }
}

export default PurchaseList;

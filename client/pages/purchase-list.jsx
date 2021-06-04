import React from 'react';
import { format } from 'date-fns';

class PurchaseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/api/purchases')
      .then(res => res.json())
      .then(data => this.setState({ purchases: data }));
  }

  handleDelete(event) {
    const purchaseId = event.target.id;
    fetch(`/api/purchases/purchaseId/${purchaseId}`, {
      method: 'DELETE'
    });

    const id = parseInt(event.target.id, 10);
    const purchases = this.state.purchases.filter(purchase => purchase.purchaseId !== id);
    this.setState({ purchases: purchases });

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
                    <h5 className="card-header">{purchase.category}</h5>
                    <div className="card-body">
                      <p className="card-text">Description: {purchase.description}</p>
                      <p className="card-text">Purchase amount: ${purchase.amount}</p>
                      <p className="card-text">Date: {dateFormatted}</p>
                      <div className="purchases-edit-delete-button-container d-flex justify-content-end">
                        <button type="button" className="btn btn-link">Edit</button>
                        <button type="button" id={purchase.purchaseId} onClick={this.handleDelete} className="btn btn-link">Delete</button>
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

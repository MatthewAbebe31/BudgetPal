import React from 'react';
import { format } from 'date-fns';

class PurchaseList extends React.Component {
  render() {
    return (
      <div>
        <h2 className="text-center mt-3 text-decoration-underline">Purchases</h2>
        {
          this.props.purchases.map((purchase, index) => {
            const date = purchase.date;
            const dateFormatted = format(new Date(date), 'MM/dd/yyyy');
            return (
              <div key={index}>
                <div className="d-flex justify-content-center">
                  <div className="card text-dark bg-light mb-3">
                    <h5 className="card-header">{purchase.categoryName}</h5>
                    <div className="card-body">
                      <p className="card-text"><b>Description:</b> {purchase.description}</p>
                      <p className="card-text"><b>Amount:</b> ${purchase.amount}</p>
                      <p className="card-text"><b>Date:</b> {dateFormatted}</p>
                      <div className="purchases-edit-delete-button-container d-flex justify-content-end">
                        <a href={`#editPurchases?purchaseId=${purchase.purchaseId}`}>
                          <button type="button" className="btn btn-link">Edit</button>
                        </a>
                        <button type="button" id={purchase.purchaseId} onClick={() => this.props.deletePurchase(purchase.purchaseId)} className="btn btn-link">Delete</button>
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
            <button type="button" className="btn btn-primary">Add New Purchase</button>
          </a>
        </div>
      </div >
    );
  }
}

export default PurchaseList;

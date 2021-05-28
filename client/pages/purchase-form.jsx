import React from 'react';

class PurchaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseId: '',
      category: '',
      description: '',
      amount: ''
    };
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
    this.handleAmountInputChange = this.handleAmountInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCategoryInputChange(event) {
    this.setState({ category: event.target.value });
  }

  handleDescriptionInputChange(event) {
    this.setState({ description: event.target.value });
  }

  handleAmountInputChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPurchase = {
      purchaseId: this.state.purchaseId,
      category: this.state.category,
      description: this.state.description,
      amount: this.state.amount
    };
    this.props.onSubmit(newPurchase);
    this.setState({ category: '' });
    this.setState({ description: '' });
    this.setState({ amount: '' });
  }

  render() {
    const categoryValue = this.state.category;
    const purchaseDescriptionValue = this.state.description;
    const amountValue = this.state.amount;

    return (
      <div>
        <form className="purchase-input-group" onSubmit={this.handleSubmit}>
          <h2 className="add-purchase-header">Add a Purchase.</h2>

          <label>Enter Category</label>
          <select className="form-select" aria-label="Default select example" required value={categoryValue} onChange={this.handleCategoryInputChange}>
            <option value="" disabled hidden>Select an option</option>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Car">Car</option>
          </select>

          <label>Enter Description</label>
          <input
            required
            autoFocus
            type="text"
            value={purchaseDescriptionValue}
            htmlFor="purchaseDescriptionInput"
            className="form-control"
            id="purchaseDescriptionInput"
            placeholder="Description"
            onChange={this.handleDescriptionInputChange} />

          <label>Enter Amount</label>
          <input
            required
            autoFocus
            type="text"
            value={amountValue}
            htmlFor="amountValueInput"
            className="form-control"
            id="amountValueInput"
            placeholder="$0.00"
            onChange={this.handleAmountInputChange} />

          <div className="purchase-form-button-container">
            <a href="#purchases">
              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </a>
          </div>

        </form>

      </div>
    );
  }
}

export default PurchaseForm;

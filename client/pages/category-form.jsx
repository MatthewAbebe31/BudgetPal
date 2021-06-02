import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '',
      categoryName: '',
      categoryAmount: ''
    };
    this.handleCategoryNameInputChange = this.handleCategoryNameInputChange.bind(this);
    this.handleCategoryAmountInputChange = this.handleCategoryAmountInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCategoryNameInputChange(event) {
    this.setState({ categoryName: event.target.value });
  }

  handleCategoryAmountInputChange(event) {
    this.setState({ categoryAmount: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newCategory = {
      categoryId: this.state.categoryId,
      categoryName: this.state.categoryName,
      categoryAmount: this.state.categoryAmount
    };
    this.props.onSubmit(newCategory);
    this.setState({ categoryName: '' });
    this.setState({ categoryAmount: '' });

    window.location.hash = '#categories';
    console.log(newCategory);
  }

  render() {
    const categoryName = this.state.categoryName;
    const categoryAmount = this.state.categoryAmount;

    return (
      <div>
        <form className="category-input-group" onSubmit={this.handleSubmit}>
          <h2 className="add-category-header">Add a Category.</h2>

          <label>Enter Name</label>
          <input
            required
            autoFocus
            type="text"
            value={categoryName}
            htmlFor="categoryNameInput"
            className="form-control"
            id="categoryNameInput"
            placeholder="Category Name"
            onChange={this.handleCategoryNameInputChange} />

          <label>Enter Amount</label>
          <input
            required
            autoFocus
            type="text"
            value={categoryAmount}
            htmlFor="categoryAmountInput"
            className="form-control"
            id="categoryAmountInput"
            placeholder="$0.00"
            onChange={this.handleCategoryAmountInputChange} />

          <div className="category-form-button-container">
            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
          </div>

        </form>

      </div>
    );
  }
}

export default CategoryForm;

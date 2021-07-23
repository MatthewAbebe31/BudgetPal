import React from 'react';

class CategoryList extends React.Component {
  render() {
    const variance = {};
    this.props.categories.forEach(category => {
      if (!Object.prototype.hasOwnProperty.call(variance, category.categoryId)) {
        variance[category.categoryId] = 0;
      }
      variance[category.categoryId] += category.amount;
    });
    return (
      <div>
        <h2 className="text-center mt-3 text-decoration-underline">Categories</h2>
        {
          this.props.categories.map(category => {
            return (
              <div key={category.categoryId}>
                <div className="d-flex justify-content-center">
                  <div className="card text-dark bg-light mb-3">
                      <h5 className="card-header">{category.categoryName}</h5>
                    <div className="card-body">
                      <p className="card-text"><b>Budget:</b> ${category.categoryAmount}</p>
                      <p className="card-text"><b>Total Spent:</b> ${parseInt(variance[category.categoryId]).toFixed(2)}</p>
                      <p className="card-text"><b>Variance:</b> ${(category.categoryAmount - variance[category.categoryId]).toFixed(2)}</p>
                      <div className="categories-edit-delete-button-container d-flex justify-content-end">
                        <a href={`#editCategories?categoryId=${category.categoryId}`}>
                          <button type="button" className="btn btn-link">Edit</button>
                        </a>
                        <button type="button" id={category.categoryId} onClick={() => this.props.deleteCategory(category.categoryId)}
                          className="btn btn-link">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
        <div className="add-new-category-button-container d-flex justify-content-center">
          <a href="#addNewCategories">
            <button type="button" className="btn btn-primary">Add New Category</button>
          </a>
        </div>
      </div >
    );
  }
}

export default CategoryList;

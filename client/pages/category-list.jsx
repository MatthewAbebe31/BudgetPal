import React from 'react';

class CategoryList extends React.Component {
  render() {
    return (
      <div>
        <h2 className="text-center mt-3 text-decoration-underline">Categories</h2>
        {
          this.props.categories.map(category => {
            return (
              <div key={category.categoryId}>
                <div className="d-flex justify-content-center">
                  <div className="card text-dark bg-light mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{category.categoryName}</h5>
                      <p className="card-text">Budget: ${category.categoryAmount}</p>
                      <div className="categories-edit-delete-button-container d-flex justify-content-end">
                        <a href={`#editCategories?categoryId=${category.categoryId}`}>
                          <button type="button" className="btn btn-link">Edit</button>
                        </a>
                        <button type="button" id={category.categoryId} onClick={() => this.props.deleteCategory(category.categoryId)} className="btn btn-link">Delete</button>
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

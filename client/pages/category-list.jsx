import React from 'react';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isDeleted: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => this.setState({ categories: data }));
  }

  handleDelete(event) {
    const id = event.target.id;
    fetch(`/api/categories/categoryId/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const categories = this.state.categories.filter(category => category[id]);
    this.setState({ categories: categories });
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => this.setState({ categories: data }));
  }

  render() {

    return (
      <div>
          <h2 className="text-center mt-3 text-decoration-underline">Categories</h2>
        {
          this.state.categories.map(category => {
            return (
              <div key={category.categoryId}>
                <div className="d-flex justify-content-center">
                  <div className="card text-dark bg-light mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{category.categoryName}</h5>
                      <p className="card-text">Budget: ${category.categoryAmount}</p>
                      <div className="categories-edit-delete-button-container d-flex justify-content-end">
                        <button type="button" className="btn btn-link">Edit</button>
                        <button type="button" id={category.categoryId} onClick={this.handleDelete} className="btn btn-link">Delete</button>
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
            <button type="button" className="btn btn-success">Add New Category</button>
          </a>
        </div>
      </div >
    );
  }
}

export default CategoryList;

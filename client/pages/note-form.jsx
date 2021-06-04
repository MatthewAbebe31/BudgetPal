import React from 'react';

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: '',
      category: '',
      note: '',
      selectCategory: []
    };
    this.handleNoteInputChange = this.handleNoteInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => this.setState({ selectCategory: data }));
  }

  handleCategoryInputChange(event) {
    this.setState({ category: event.target.value });
  }

  handleNoteInputChange(event) {
    this.setState({ note: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newNote = {
      noteId: this.state.noteId,
      category: this.state.category,
      note: this.state.note
    };
    this.props.onSubmit(newNote);
    this.setState({ category: '' });
    this.setState({ note: '' });

    window.location.hash = '#notes';
  }

  render() {
    const categoryValue = this.state.category;
    const noteValue = this.state.note;
    const optionTemplate = this.state.selectCategory.map((v, key) => (
      <option key={key} value={v.id}>{v.categoryName}</option>
    ));

    return (
      <div className="row">
        <div className="col">
          <div className="note-form-container pt-5">
            <form className="note-input-group" onSubmit={this.handleSubmit}>
              <h2 className="add-note-header">Add a Note.</h2>

              <label>Enter Category</label>
              <select className="form-select" aria-label="Default select example" required value={categoryValue} onChange={this.handleCategoryInputChange}>
                <option value="" disabled hidden>Select an option</option>
                {optionTemplate}
              </select>

              <label>Enter Note</label>
              <input
                required
                autoFocus
                type="text"
                value={noteValue}
                htmlFor="purchaseDescriptionInput"
                className="form-control"
                id="purchaseDescriptionInput"
                placeholder="Description"
                onChange={this.handleNoteInputChange} />

              <div className="note-form-button-container d-flex justify-content-end w-100">
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteForm;

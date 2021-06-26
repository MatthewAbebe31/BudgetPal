import React from 'react';

class EditNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: '',
      category: '',
      note: '',
      selectCategory: []
    };
    this.handleEditCategoryInputChange = this.handleEditCategoryInputChange.bind(this);
    this.handleEditNoteInputChange = this.handleEditNoteInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => this.setState({ selectCategory: data }));
  }

  handleEditCategoryInputChange(event) {
    this.setState({ category: event.target.value });
  }

  handleEditNoteInputChange(event) {
    this.setState({ note: event.target.value });
  }

  handleSubmit(event) {

    const editedNote = {
      noteId: parseInt(this.props.noteId),
      category: this.state.category,
      note: this.state.note
    };
    this.props.onSubmit(editedNote, editedNote.noteId);
    this.setState({ category: '' });
    this.setState({ note: '' });
  }

  render() {
    const editedCategory = this.state.category;
    const editedNote = this.state.note;
    const optionTemplate = this.state.selectCategory.map((v, key) => (
      <option key={key} value={v.id}>{v.categoryName}</option>
    ));

    return (
      <div className="row">
        <div className="col">
          <div className="edit-note-form-container pt-5">
            <form className="edit-note-form-group" onSubmit={this.handleSubmit}>
              <h2 className="edit-note-header">Edit a Note.</h2>

              <label>Enter Category</label>
              <select className="form-select" aria-label="Default select example" required value={editedCategory} onChange={this.handleEditCategoryInputChange}>
                <option value="" disabled hidden>Select an option</option>
                {optionTemplate}
              </select>

              <label>Enter Note</label>
              <input
                required
                autoFocus
                type="text"
                value={editedNote}
                htmlFor="editNoteInput"
                className="form-control"
                id="editNoteInput"
                placeholder="Note"
                onChange={this.handleEditNoteInputChange} />

              <div className="edit-note-form-button-container d-flex justify-content-end w-100">
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditNoteForm;

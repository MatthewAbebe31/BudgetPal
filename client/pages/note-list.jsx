import React from 'react';
import { format } from 'date-fns';

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      isLoading: true
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => this.setState({ notes: data, isLoading: false }));
  }

  handleDelete(event) {
    const noteId = event.target.id;
    fetch(`/api/notes/noteId/${noteId}`, {
      method: 'DELETE'
    });

    const id = parseInt(event.target.id, 10);
    const notes = this.state.notes.filter(note => note.noteId !== id);
    this.setState({ notes: notes });

  }

  render() {
    if (this.state.isLoading === true) {
      console.log(this.state.isLoading);
    }

    return (
      <div>
        <h2 className="text-center mt-3 text-decoration-underline">Notes</h2>
        {
          this.state.notes.map(note => {
            const date = note.date;
            const dateFormatted = format(new Date(date), 'MM/dd/yyyy');
            return (
              <div key={note.noteId}>
                <div className="d-flex justify-content-center">
                  <div className="card text-dark bg-light mb-3">
                    <h5 className="card-header">{note.category}</h5>
                    <div className="card-body">
                      <p className="card-text">Note: {note.note}</p>
                      <p className="card-text">Date: {dateFormatted}</p>
                      <div className="notes-edit-delete-button-container d-flex justify-content-end">
                        <a href={`#editNotes?noteId=${note.noteId}`}>
                          <button type="button" className="btn btn-link">Edit</button>
                        </a>
                        <button type="button" id={note.noteId} onClick={this.handleDelete} className="btn btn-link">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
        <div className="add-new-note-button-container d-flex justify-content-center">
          <a href="#addNewNotes">
            <button type="button" className="btn btn-primary">Add New Note</button>
          </a>
        </div>
      </div >
    );
  }
}

export default NoteList;

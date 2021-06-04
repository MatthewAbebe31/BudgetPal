import React from 'react';
import { format } from 'date-fns';

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => this.setState({ notes: data }));
  }

  render() {

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
                        <button type="button" className="btn btn-link">Edit</button>
                        <button type="button" className="btn btn-link">Delete</button>
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
            <button type="button" className="btn btn-success">Add New Note</button>
          </a>
        </div>
      </div >
    );
  }
}

export default NoteList;

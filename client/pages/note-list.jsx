import React from 'react';
import { format } from 'date-fns';

class NoteList extends React.Component {
  render() {
    return (
      <div>
        <h2 className="text-center mt-3 text-decoration-underline">Notes</h2>
        {
          this.props.notes.map(note => {
            const date = note.date;
            const dateFormatted = format(new Date(date), 'MM/dd/yyyy');
            return (
              <div key={note.noteId}>
                <div className="d-flex justify-content-center">
                  <div className="card text-dark bg-light mb-3">
                    <h5 className="card-header">{note.category}</h5>
                    <div className="card-body">
                      <p className="card-text"><b>Note:</b> {note.note}</p>
                      <p className="card-text"><b>Date:</b> {dateFormatted}</p>
                      <div className="notes-edit-delete-button-container d-flex justify-content-end">
                        <a href={`#editNotes?noteId=${note.noteId}`}>
                          <button type="button" className="btn btn-link">Edit</button>
                        </a>
                        <button type="button" id={note.noteId} onClick={() => this.props.deleteNote(note.noteId)} className="btn btn-link">Delete</button>
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

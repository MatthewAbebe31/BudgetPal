import React from 'react';
import Navbar from './pages/navbar';
import Home from './pages/home';
import CategoryList from './pages/category-list';
import CategoryForm from './pages/category-form';
import EditCategoryForm from './pages/edit-category-form';
import PurchaseList from './pages/purchase-list';
import PurchaseForm from './pages/purchase-form';
import EditPurchaseForm from './pages/edit-purchase-form';
import NoteList from './pages/note-list';
import NoteForm from './pages/note-form';
import EditNoteForm from './pages/edit-note-form';
import Analysis from './pages/analysis';
import Footer from './pages/footer';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      categories: [],
      notes: [],
      route: parseRoute(window.location.hash)
    };
    this.addPurchase = this.addPurchase.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addNote = this.addNote.bind(this);
    this.putCategory = this.putCategory.bind(this);
    this.putPurchase = this.putPurchase.bind(this);
    this.putNote = this.putNote.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.deletePurchase = this.deletePurchase.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
    this.getAllCategories();
    this.getAllPurchases();
    this.getAllNotes();
  }

  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));
  }

  getAllPurchases() {
    fetch('/api/purchases')
      .then(response => response.json())
      .then(data => this.setState({ purchases: data }));
  }

  getAllNotes() {
    fetch('/api/notes')
      .then(response => response.json())
      .then(data => this.setState({ notes: data }));
  }

  addCategory(newCategory) {

    const newCategoryArr = [];

    fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
      .then(response => response.json())
      .then(data => {
        this.state.categories.push(data);
        for (let i = 0; i < this.state.categories.length; i++) {
          newCategoryArr.unshift(this.state.categories[i]);
        }
        this.setState({ categories: newCategoryArr });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  addPurchase(newPurchase) {

    const newPurchaseArr = [];

    fetch('/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPurchase)
    })
      .then(response => response.json())
      .then(data => {
        this.state.purchases.push(data);
        for (let i = 0; i < this.state.purchases.length; i++) {
          newPurchaseArr.unshift(this.state.purchases[i]);
        }
        this.setState({ purchases: newPurchaseArr });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  addNote(newNote) {

    const newNoteArr = [];

    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(data => {
        this.state.notes.push(data);
        for (let i = 0; i < this.state.notes.length; i++) {
          newNoteArr.unshift(this.state.notes[i]);
        }
        this.setState({ notes: newNoteArr });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  putCategory(editedCategory, categoryId) {

    let index = null;
    for (let i = 0; i < this.state.categories.length; i++) {
      const category = this.state.categories[i];
      if (category.categoryId === categoryId) {
        index = i;
      }
    }

    fetch('/api/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedCategory)
    })
      .then(response => response.json())
      .then(data => {
        const newCategories = this.state.categories.slice();
        newCategories[index] = data;
        this.setState({ categories: newCategories });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  putPurchase(editedPurchase, purchaseId) {
    let index = null;
    for (let i = 0; i < this.state.purchases.length; i++) {
      const purchase = this.state.purchases[i];
      if (purchase.purchaseId === purchaseId) {
        index = i;
      }
    }

    fetch('/api/purchases', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedPurchase)
    })
      .then(response => response.json())
      .then(data => {
        const newPurchases = this.state.purchases.slice();
        newPurchases[index] = data;
        this.setState({ purchases: newPurchases });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  putNote(editedNote, noteId) {
    let index = null;
    for (let i = 0; i < this.state.notes.length; i++) {
      const note = this.state.notes[i];
      if (note.noteId === noteId) {
        index = i;
      }
    }

    fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedNote)
    })
      .then(response => response.json())
      .then(data => {
        const newNotes = this.state.notes.slice();
        newNotes[index] = data;
        this.setState({ notes: newNotes });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  deleteCategory(categoryId) {

    fetch(`/api/categories/categoryId/${categoryId}`, {
      method: 'DELETE'
    })
      .catch(err => {
        console.error(err);
      });

    const id = parseInt(categoryId, 10);
    const categories = this.state.categories.filter(category => category.categoryId !== id);
    this.setState({ categories: categories });

  }

  deletePurchase(purchaseId) {

    fetch(`/api/purchases/purchaseId/${purchaseId}`, {
      method: 'DELETE'
    })
      .catch(err => {
        console.error(err);
      });

    const id = parseInt(purchaseId, 10);
    const purchases = this.state.purchases.filter(purchase => purchase.purchaseId !== id);
    this.setState({ purchases: purchases });

  }

  deleteNote(noteId) {

    fetch(`/api/notes/noteId/${noteId}`, {
      method: 'DELETE'
    })
      .catch(err => {
        console.error(err);
      });

    const id = parseInt(noteId, 10);
    const notes = this.state.notes.filter(note => note.noteId !== id);
    this.setState({ notes: notes });

  }

  renderPage() {

    const { route } = this.state;

    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'categories') {
      return <CategoryList
        categories={this.state.categories}
        deleteCategory={this.deleteCategory} />;
    }
    if (route.path === 'purchases') {
      return <PurchaseList
        purchases={this.state.purchases}
        deletePurchase={this.deletePurchase} />;
    }
    if (route.path === 'notes') {
      return <NoteList
        notes={this.state.notes}
        deleteNote={this.deleteNote} />;
    }
    if (route.path === 'addNewNotes') {
      return <NoteForm onSubmit={this.addNote} />;
    }
    if (route.path === 'addNewPurchases') {
      return <PurchaseForm onSubmit={this.addPurchase} />;
    }
    if (route.path === 'addNewCategories') {
      return <CategoryForm onSubmit={this.addCategory} />;
    }
    if (route.path === 'editNotes') {
      const noteId = route.params.get('noteId');
      return <EditNoteForm noteId={noteId} onSubmit={this.putNote} />;
    }
    if (route.path === 'editPurchases') {
      const purchaseId = route.params.get('purchaseId');
      return <EditPurchaseForm purchaseId={purchaseId} onSubmit={this.putPurchase} />;
    }
    if (route.path === 'editCategories') {
      const categoryId = route.params.get('categoryId');
      return <EditCategoryForm categoryId={categoryId} onSubmit={this.putCategory} />;
    }
    if (route.path === 'analysis') {
      return <Analysis />;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="content-container">
          {this.renderPage()}
        </div>
        <Footer />
      </>
    );
  }
}

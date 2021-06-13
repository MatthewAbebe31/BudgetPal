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
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
  }

  addPurchase(newPurchase) {

    fetch('/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPurchase)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ purchases: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  addCategory(newCategory) {

    fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  addNote(newNote) {

    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  putCategory(editedCategory) {

    fetch('/api/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedCategory)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  putPurchase(editedPurchase) {

    fetch('/api/purchases', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedPurchase)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ purchases: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  putNote(editedNote) {

    fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedNote)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  renderPage() {

    const { route } = this.state;

    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'categories') {
      return <CategoryList />;
    }
    if (route.path === 'purchases') {
      return <PurchaseList />;
    }
    if (route.path === 'notes') {
      return <NoteList />;
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
          { this.renderPage()}
        </div>
        <Footer />
      </>
    );
  }
}

import React from 'react';
import Navbar from './pages/navbar';
import Home from './pages/home';
import CategoryList from './pages/category-list';
import CategoryForm from './pages/category-form';
import EditCategoryForm from './pages/edit-category-form';
import PurchaseList from './pages/purchase-list';
import PurchaseForm from './pages/purchase-form';
import NoteList from './pages/note-list';
import NoteForm from './pages/note-form';
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
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
    this.getAllPurchases();
    this.getAllCategories();
    this.getAllNotes();
  }

  getAllPurchases() {
    fetch('/api/purchases')
      .then(response => response.json())
      .then(data => this.setState({ purchases: data }));
  }

  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));
  }

  getAllNotes() {
    fetch('/api/notes')
      .then(response => response.json())
      .then(data => this.setState({ notes: data }));
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
    //  if (route.path === 'editNotes') {
    //   return <EditNoteForm onSubmit={this.addNote} />;
    // }
    //  if (route.path === 'editPurchases') {
    //   return <EditPurchaseForm onSubmit={this.addNote} />;
    // }
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
        <Footer />
        { this.renderPage()}
      </>
    );
  }
}

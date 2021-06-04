import React from 'react';
import Navbar from './pages/navbar';
import CategoryList from './pages/category-list';
import CategoryForm from './pages/category-form';
import PurchaseList from './pages/purchase-list';
import PurchaseForm from './pages/purchase-form';
import NoteList from './pages/note-list';
import NoteForm from './pages/note-form';
import Analysis from './pages/analysis';
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

  renderPage() {
    const { route } = this.state;
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
    if (route.path === 'analysis') {
      return <Analysis />;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        { this.renderPage()}
      </>
    );
  }
}

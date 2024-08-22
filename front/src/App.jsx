import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/context/AuthContect'; 
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
// import HomePage from './pages/HomePage/HomePage';
import AddCategoryPage from './Pages/AddCategoryPage/AddCategoryPage'
import AddAddsPage from './Pages/AddAddsPage/AddAddsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ManageCategoryPage from './Pages/ManageCategoryPage/ManageCategoryPage';
// import ManageBooksPage from './pages/ManageBooksPage/ManageBooksPage';
// import BookDetailPage from './components/BookDetails/BookDetailsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes> 
          {/* <Route path="/" element={<HomePage />} />  */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-category" element={<AddCategoryPage />} />
          <Route path="/add-adds" element={<AddAddsPage />} />
          {/* <Route path="/book/:id" element={<BookDetailPage />} /> */}
          <Route path="/manage-categorys" element={<ManageCategoryPage />} />
          {/* <Route path="/manage-books" element={<ManageBooksPage />}/> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

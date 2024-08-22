import { useState, useEffect } from 'react';
import './AddCategoryPage.css';
import { addCategory} from '../../servises/CategoryServise'
import { getUserRole } from '../../servises/Userservice';

const AddGenrePage = () => {
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const role = await getUserRole(token);
          setIsAdmin(role === 'ROLE_ADMIN');
        } catch (error) {
          console.error('Failed to fetch user role:', error);
        }
      }
    };
    checkAdmin();
  }, []);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCategory({ name: category });
      setSuccess('Category added successfully');
      setError('');
    } catch (err) {
      setError('Adding genre failed. Please try again.');
      setSuccess('');
    }
  };

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="add-genre-container">
      <h2>Add a New Category</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <form onSubmit={handleSubmit} className="add-genre-form">
        <div className="form-group">
          <label htmlFor="genre">Category</label>
          <input
            type="text"
            id="category"
            name="gategory"
            value={category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Category</button>
      </form>
    </div>
  );
};

export default AddGenrePage;

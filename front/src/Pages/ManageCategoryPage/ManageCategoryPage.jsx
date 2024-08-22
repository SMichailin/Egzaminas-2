import { useState, useEffect } from 'react';
import './ManageCategoryPage.css';
import { fetchCategorys,deleteCategory,updateCategory } from '../../servises/CategoryServise';

const ManageCategoryPage = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newGenreName, setNewGenreName] = useState('');

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchCategorys();
        setCategory(genresData);
      } catch (err) {
        setError('Failed to fetch genres.');
        console.error(err);
      }
    };

    loadGenres();
  }, []);

  const handleEdit = (genre) => {
    setEditCategoryId(genre.id);
    setNewGenreName(genre.name);
  };

  const handleUpdate = async (id) => {
    try {
      await updateCategory(id, newGenreName);
      setCategory(category.map(category => category.id === id ? { ...category, name: newGenreName } : category));
      setEditCategoryId(null);
    } catch (err) {
      setError('Failed to update genre.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategory(category.filter(genre => genre.id !== id));
    } catch (err) {
      setError('Failed to delete genre.');
      console.error(err);
    }
  };

  return (
    <div className="manage-genres-container">
      <h1>Manage Genres</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="genres-list">
        {category.map((category) => (
          <li key={category.id} className="genre-item">
            {editCategoryId === category.id ? (
              <div className="edit-genre">
                <input
                  type="text"
                  value={newGenreName}
                  onChange={(e) => setNewGenreName(e.target.value)}
                />
                <button onClick={() => handleUpdate(category.id)}>Update</button>
                <button onClick={() => setEditCategoryId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="genre-info">
                <span>{category.name}</span>
                <button onClick={() => handleEdit(category)}>Edit</button>
                <button onClick={() => handleDelete(category.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategoryPage;

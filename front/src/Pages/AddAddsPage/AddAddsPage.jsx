import { useState, useEffect } from 'react';
import './AddAddsPage.css';
import { addAdd } from '../../servises/AddService';
import { fetchCategorys } from '../../servises/CategoryServise';

const AddAddsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    kaina: '',
    miestas: '',
    category:''
  });

  const [categorys, setCategorys] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchcategorysData = async () => {
      try {
        const genres = await fetchCategorys();
        setCategorys(genres);
      } catch (err) {
        console.error('Failed to fetch categorys', err);
      }
    };

    fetchcategorysData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAdd(formData);
      setSuccess('add added successfully');
      setError('');
    } catch (err) {
      setError('Adding add failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Add</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">kaina</label>
          <input
            type="text"
            id="kaina"
            name="kaina"
            value={formData.kaina}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="img">miestas </label>
          <input
            type="text"
            id="miestas"
            name="miestas"
            value={formData.miestas}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categorys.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddAddsPage;

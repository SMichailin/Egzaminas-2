import axios from 'axios';

export const addCategory = async (category) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.post('http://localhost:8080/api/categorys', category, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding genre:', error);
    throw error;
  }
};
const API_URL_2 = 'http://localhost:8080/api/categorys'; // Adjust the URL if necessary

export const fetchCategorys = async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(API_URL_2, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const updateCategory = async (id, name) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.put(`${API_URL_2}/${id}`, { name }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.delete(`${API_URL_2}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
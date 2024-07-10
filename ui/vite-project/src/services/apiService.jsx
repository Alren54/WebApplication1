// apiService.jsx (or any suitable name)
import axios from 'axios';

const API_URL = 'http://localhost:5221/api/WebApplication1/';

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}GetNotes`);
    return response.data; // Assuming API returns an array of notes
  } catch (error) {
    console.error('Error fetching notes:', error);
    return []; // Handle error gracefully, return empty array or handle error state
  }
};

import axios from "axios";


const apiCall = async (url, body) => {
    try {

        const baseUrl = 'http://localhost:3000/api';
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }
        const response = await axios.post(baseUrl + url, body, config);
  
      return response.data;
    } catch (err) {
      return null;
    }
};

export {apiCall};
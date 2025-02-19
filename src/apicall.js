import axios from "axios";


const apiCall = async (url, body, token) => {
    try {

      console.log(url, body, token)

        const baseUrl = 'http://51.20.6.241/api';

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
import axios from "axios";

const fetchData = async () => {
  const token = '0d092176152d4c7f46c1d9a1fbecd2920ad3c18efe9d0bda498cf8b70dbd8d41ftXgQmhEOQcwsmZWnOc7NB%2FEhw6qadooH6iDaDMEC8IRv%2BYASxkwprmXDiaNkZM21guAWxXwfU6B6uzAFvR0I4AHt5eXr8BJhydw1VeuoXc%3D'; // Replace with your actual token

  try {
    const response = await axios.get('https://api.dev101.broadnet.app/jwt', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Failed to fetch data:', error.response?.data || error.message);
  }
};

fetchData();

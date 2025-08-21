// Mock API service for testing Razorpay integration
// Replace this with actual backend API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const paymentAPI = {
  // Create order (mock implementation)
  createOrder: async (orderData) => {
    // In production, replace this with actual API call
    // return axios.post(`${API_BASE_URL}/api/payment/create-order`, orderData);
    
    // Mock response for testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            order_id: `order_${Date.now()}`,
            amount: orderData.amount,
            currency: orderData.currency || 'INR'
          }
        });
      }, 1000);
    });
  },

  // Verify payment (mock implementation)
  verifyPayment: async (paymentData) => {
    // In production, replace this with actual API call
    // return axios.post(`${API_BASE_URL}/api/payment/verify`, paymentData);
    
    // Mock response for testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            message: 'Payment verified successfully'
          }
        });
      }, 500);
    });
  }
};

// Utility function to get Razorpay key from environment
export const getRazorpayKey = () => {
  return import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key_here';
};

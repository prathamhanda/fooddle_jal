// GET-only Google Sheets service
// Since POST is having issues, let's use GET requests with query parameters

const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID || '',
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
  appsScriptUrl: import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '',
  range: 'Sheet1!A:E'
};

// Test function - GET only
export const testGoogleSheetsAPI = async () => {
  try {
    console.log('🧪 Testing Google Apps Script (GET only)...');
    console.log('🔗 Apps Script URL:', GOOGLE_SHEETS_CONFIG.appsScriptUrl);
    
    if (GOOGLE_SHEETS_CONFIG.appsScriptUrl) {
      // Test basic connection
      const testUrl = `${GOOGLE_SHEETS_CONFIG.appsScriptUrl}?action=test`;
      const response = await fetch(testUrl);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Google Apps Script test successful!');
        return { success: true, data: data };
      } else {
        throw new Error(`Apps Script test failed: ${response.status}`);
      }
    } else {
      throw new Error('Apps Script URL not configured');
    }
  } catch (error) {
    console.error('❌ Error testing Google Sheets API:', error);
    return { success: false, error: error.message };
  }
};

// Initialize headers - GET only
export const initializeHeaders = async () => {
  try {
    console.log('📋 Initializing Google Sheets headers...');
    
    const url = `${GOOGLE_SHEETS_CONFIG.appsScriptUrl}?action=initHeaders`;
    const response = await fetch(url);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Headers initialized successfully');
      return { success: true, data: result };
    } else {
      console.error('❌ Failed to initialize headers');
      return { success: false, error: 'Failed to initialize headers' };
    }
  } catch (error) {
    console.error('❌ Error initializing headers:', error);
    return { success: false, error: error.message };
  }
};

// Add customer data - GET with query parameters
export const addCustomerToGoogleSheets = async (customerName, customerEmail, customerPhone) => {
  try {
    console.log('➕ Adding customer to Google Sheets...', { customerName, customerEmail, customerPhone });
    
    const registrationDate = new Date().toISOString();
    
    // Create query parameters for GET request - no order data yet
    const params = new URLSearchParams({
      action: 'addRow',
      name: customerName || '',
      email: customerEmail || '',
      phone: customerPhone,
      regDate: registrationDate,
      orders: '0', // No orders yet
      amount: '0', // No amount yet
      lastOrder: '' // No orders yet
    });
    
    const url = `${GOOGLE_SHEETS_CONFIG.appsScriptUrl}?${params.toString()}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Customer added successfully:', result);
      return { success: true, data: result };
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to add customer:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('❌ Error adding customer:', error);
    return { success: false, error: error.message };
  }
};

// Legacy function for backward compatibility - now calls the updated version with order data
export const addCustomerWithOrderToGoogleSheets = async (customerData) => {
  try {
    console.log('➕ Adding customer with order to Google Sheets...', customerData);
    
    const { customerName, customerEmail, customerPhone, totalAmount } = customerData;
    const registrationDate = new Date().toISOString();
    
    // Create query parameters for GET request
    const params = new URLSearchParams({
      action: 'addRow',
      name: customerName || '',
      email: customerEmail || '',
      phone: customerPhone,
      regDate: registrationDate,
      orders: '1',
      amount: totalAmount.toString(),
      lastOrder: registrationDate
    });
    
    const url = `${GOOGLE_SHEETS_CONFIG.appsScriptUrl}?${params.toString()}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Customer with order added successfully:', result);
      return { success: true, data: result };
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to add customer with order:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('❌ Error adding customer with order:', error);
    return { success: false, error: error.message };
  }
};

// Update customer data - GET with query parameters
export const updateCustomerInGoogleSheets = async (rowIndex, customerData) => {
  try {
    console.log('🔄 Updating customer in Google Sheets...', customerData);
    
    const { customerName, customerEmail, customerPhone, totalOrders, totalAmount } = customerData;
    const lastOrderDate = new Date().toISOString();
    
    // Create query parameters
    const params = new URLSearchParams({
      action: 'updateRow',
      rowIndex: rowIndex.toString(),
      name: customerName || '',
      email: customerEmail || '',
      phone: customerPhone,
      orders: totalOrders.toString(),
      amount: totalAmount.toString(),
      lastOrder: lastOrderDate
    });
    
    const url = `${GOOGLE_SHEETS_CONFIG.appsScriptUrl}?${params.toString()}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Customer updated successfully:', result);
      return { success: true, data: result };
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to update customer:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('❌ Error updating customer:', error);
    return { success: false, error: error.message };
  }
};

// Get all data - GET request
export const getAllDataFromGoogleSheets = async () => {
  try {
    console.log('📊 Getting all data from Google Sheets...');
    
    const url = `${GOOGLE_SHEETS_CONFIG.appsScriptUrl}?action=getData`;
    const response = await fetch(url);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Data retrieved successfully:', result);
      return { success: true, data: result.data };
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to get data:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('❌ Error getting data:', error);
    return { success: false, error: error.message };
  }
};

// Find customer by phone - GET request
export const findCustomerByPhone = async (phoneNumber) => {
  try {
    console.log('🔍 Finding customer by phone...', phoneNumber);
    
    const params = new URLSearchParams({
      action: 'findRow',
      phone: phoneNumber
    });
    
    const url = `${GOOGLE_SHEETS_CONFIG.appsScriptUrl}?${params.toString()}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const result = await response.json();
      console.log('🔍 Customer search result:', result);
      return { success: result.success, data: result.data };
    } else {
      console.log('❌ Customer not found or error occurred');
      return { success: false, data: null };
    }
  } catch (error) {
    console.error('❌ Error finding customer:', error);
    return { success: false, error: error.message };
  }
};

// Save order data (main function used by payment service)
export const saveOrderData = async (orderData) => {
  try {
    console.log('💾 Saving order data to Google Sheets...', orderData);
    
    const { customerName, customerEmail, customerPhone, amount } = orderData;
    
    if (!customerPhone || amount === undefined || amount === null) {
      throw new Error('Customer phone and amount are required');
    }
    
    // First, try to find existing customer by phone
    const existingCustomer = await findCustomerByPhone(customerPhone);
    
    if (existingCustomer.success && existingCustomer.data) {
      // Update existing customer
      const currentData = existingCustomer.data.rowData;
      const currentOrders = parseInt(currentData[4]) || 0; // Orders column (assuming column E)
      const currentAmount = parseFloat(currentData[5]) || 0; // Amount column (assuming column F)
      
      const updatedData = {
        customerName: customerName || currentData[0] || '', // Keep existing name if not provided
        customerEmail: customerEmail || currentData[1] || '', // Keep existing email if not provided  
        customerPhone: customerPhone,
        totalOrders: currentOrders + 1,
        totalAmount: currentAmount + amount
      };
      
      return await updateCustomerInGoogleSheets(existingCustomer.data.rowIndex, updatedData);
    } else {
      // Add new customer with order data
      const newCustomerData = {
        customerName: customerName || '',
        customerEmail: customerEmail || '',
        customerPhone: customerPhone,
        totalAmount: amount
      };
      
      return await addCustomerWithOrderToGoogleSheets(newCustomerData);
    }
  } catch (error) {
    console.error('❌ Error saving order data:', error);
    return { success: false, error: error.message };
  }
};

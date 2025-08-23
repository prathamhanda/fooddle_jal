/**
 * GET-Only Google Apps Script for Google Sheets Integration
 * This version only uses GET requests since POST seems to have CORS issues
 */

const SPREADSHEET_ID = '1e2jlGv-JT7sFibjV9Mhh1n_pUTCknpcW19eC1JbjbOU';

function doGet(e) {
  try {
    const action = e.parameter.action || 'test';
    
    console.log('GET request received with action:', action);
    console.log('All parameters:', e.parameter);
    
    switch (action) {
      case 'test':
        return createResponse(true, 'Google Apps Script is working!');
        
      case 'getData':
        return getAllData();
        
      case 'initHeaders':
        return initializeSheetHeaders();
        
      case 'addRow':
        return addRowFromParams(e.parameter);
        
      case 'updateRow':
        return updateRowFromParams(e.parameter);
        
      case 'findRow':
        return findRowByPhone(e.parameter.phone);
        
      default:
        return createResponse(false, 'Unknown GET action: ' + action);
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

function doPost(e) {
  // Keep POST for compatibility, but redirect to GET-style handling
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    console.log('POST request received, redirecting to GET-style handling');
    
    if (action === 'getData') {
      return getAllData();
    } else if (action === 'test') {
      return createResponse(true, 'Google Apps Script is working! (via POST)');
    } else {
      return createResponse(false, 'POST not supported for this action, use GET');
    }
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

function getAllData() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Initialize headers if needed
    initializeHeaders(sheet);
    
    // Get all data
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    
    if (lastRow <= 1) {
      return createResponse(true, 'No data found', { values: [] });
    }
    
    const range = sheet.getRange(1, 1, lastRow, Math.max(lastCol, 5));
    const values = range.getValues();
    
    return createResponse(true, 'Data retrieved successfully', { values: values });
  } catch (error) {
    console.error('Error getting data:', error);
    return createResponse(false, 'Failed to get data: ' + error.toString());
  }
}

function initializeSheetHeaders() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    initializeHeaders(sheet);
    return createResponse(true, 'Headers initialized successfully');
  } catch (error) {
    console.error('Error initializing headers:', error);
    return createResponse(false, 'Failed to initialize headers: ' + error.toString());
  }
}

function addRowFromParams(params) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Initialize headers if needed
    initializeHeaders(sheet);
    
    // Extract parameters
    const phone = params.phone || '';
    const regDate = params.regDate || new Date().toISOString();
    const orders = params.orders || '1';
    const amount = params.amount || '0';
    const lastOrder = params.lastOrder || regDate;
    
    const rowData = [phone, regDate, orders, amount, lastOrder];
    
    // Add the new row
    sheet.appendRow(rowData);
    
    return createResponse(true, 'Row added successfully', { 
      rowData: rowData,
      rowCount: sheet.getLastRow()
    });
  } catch (error) {
    console.error('Error adding row from params:', error);
    return createResponse(false, 'Failed to add row: ' + error.toString());
  }
}

function updateRowFromParams(params) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Extract parameters
    const rowIndex = parseInt(params.rowIndex);
    const phone = params.phone || '';
    const orders = params.orders || '1';
    const amount = params.amount || '0';
    const lastOrder = params.lastOrder || new Date().toISOString();
    
    // Get the current row to preserve registration date
    const currentRow = sheet.getRange(rowIndex, 1, 1, 5).getValues()[0];
    const regDate = currentRow[1] || new Date().toISOString();
    
    const rowData = [phone, regDate, orders, amount, lastOrder];
    
    // Update the row
    const range = sheet.getRange(rowIndex, 1, 1, 5);
    range.setValues([rowData]);
    
    return createResponse(true, 'Row updated successfully', { 
      rowIndex: rowIndex,
      rowData: rowData 
    });
  } catch (error) {
    console.error('Error updating row from params:', error);
    return createResponse(false, 'Failed to update row: ' + error.toString());
  }
}

function findRowByPhone(phoneNumber) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    console.log('Searching for phone number:', phoneNumber);
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString() === phoneNumber.toString()) {
        return createResponse(true, 'Phone number found', {
          rowIndex: i + 1, // Convert to 1-based index
          rowData: data[i]
        });
      }
    }
    
    return createResponse(false, 'Phone number not found');
  } catch (error) {
    console.error('Error finding row:', error);
    return createResponse(false, 'Failed to find row: ' + error.toString());
  }
}

function initializeHeaders(sheet) {
  try {
    const firstRow = sheet.getRange(1, 1, 1, 5).getValues()[0];
    
    // Check if headers exist
    const expectedHeaders = ['Phone Number', 'Registration Date', 'Total Orders', 'Total Amount', 'Last Order Date'];
    const needsHeaders = firstRow.every(cell => cell === '') || firstRow[0] !== expectedHeaders[0];
    
    if (needsHeaders) {
      console.log('Adding headers to sheet...');
      sheet.getRange(1, 1, 1, 5).setValues([expectedHeaders]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4F46E5');
      headerRange.setFontColor('#FFFFFF');
    }
  } catch (error) {
    console.error('Error initializing headers:', error);
  }
}

function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

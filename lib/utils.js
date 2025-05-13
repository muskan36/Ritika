import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchVaccines(status = null) {
  try {
    // Call the external API directly
    const response = await fetch('https://7n0wver1gl.execute-api.eu-west-2.amazonaws.com/dev/fetch-all-vaccines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pharmacyNo: "PN1853278176"
      }),
    });
    
    const data = await response.json();
    
    if (data.responseStatus && data.responseStatus.code === 1001) {
      let vaccines = data.vaccineList;
      
      // Filter by status if provided
      if (status) {
        vaccines = vaccines.filter(v => 
          v.status.toLowerCase() === status.toLowerCase()
        );
      }
      
      // Preserve the original data structure for each vaccine
      return vaccines.map(vaccine => ({
        ...vaccine,
        _original: {...vaccine} // Store original API response
      }));
    } else {
      console.error('Failed to fetch vaccines:', data.responseStatus?.message || 'Unknown error');
      return [];
    }
  } catch (error) {
    console.error('Error fetching vaccines:', error);
    return [];
  }
}

// Constants for API endpoints
const API_BASE_URL = 'https://7n0wver1gl.execute-api.eu-west-2.amazonaws.com/dev';
const PHARMACY_NO = "PN1853278176";

// Generic API call function
async function callApi(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        pharmacyNo: PHARMACY_NO
      }),
    });

    const responseData = await response.json();

    return {
      success: responseData.responseStatus?.code === 1001,
      message: responseData.responseStatus?.message || 'Unknown error',
      data: responseData
    };
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    return {
      success: false,
      message: `Failed to call ${endpoint}. Please try again.`,
      error
    };
  }
}


export async function createUser(userDetails) {
  try {
    console.log('Creating user with details:', userDetails);
    
    // Format the request body with only name and mobile number
    const requestBody = {
      name: userDetails.name,
      mobileNo: userDetails.mobile
    };
    
    // Call the API
    const response = await fetch(`${API_BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    const responseData = await response.json();
    console.log('Create user API response:', responseData);
    
    if (responseData.responseStatus?.code === 1001) {
      return {
        success: true,
        message: 'User created successfully. Verification code sent to your mobile.',
        clientID: responseData.clientID,
        userID: responseData.userID
      };
    } else {
      return {
        success: false,
        message: responseData.responseStatus?.message || 'Failed to create user',
        clientID: null,
        userID: null
      };
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      message: 'Error connecting to the server. Please try again later.',
      clientID: null,
      userID: null
    };
  }
}

export async function verifyOTP(phoneNumber, otp, clientID) {
  try {
    console.log('Verifying OTP for', phoneNumber, otp, 'clientID:', clientID);
    
    // Call the verify-otp API with the correct field names
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNo: phoneNumber,
        otp: otp,
        clientID: clientID 
      }),
    });
    
    const responseData = await response.json();
    console.log('Verify OTP API response:', responseData);
    
    if (responseData.responseStatus?.code === 1001) {
      return {
        success: true,
        message: 'OTP verified successfully',
        data: {
          clientID: responseData.clientID, // Keep forwarding clientID
          userID: responseData.userID || null // Also forward userID if present
        }
      };
    } else {
      return {
        success: false,
        message: responseData.responseStatus?.message || 'Failed to verify OTP',
        data: null
      };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      message: 'Error connecting to the server. Please try again later.',
      data: null
    };
  }
}

// Update bookSlotForDay to use userID instead of clientID
export async function bookSlotForDay(bookingData) {
  // Prepare booking data for API
  const {
    selectedDate,
    selectedTime,
    userDetails,
    cartItems,
    vaccineNames
  } = bookingData;

  console.log('Booking data received:', bookingData);

  // Validate required inputs
  if (!selectedDate || !selectedTime || !userDetails) {
    console.error('Missing required booking data');
    return {
      success: false,
      message: 'Missing required booking information'
    };
  }

  // Validate cart items
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    console.error('No vaccines selected for booking');
    return {
      success: false,
      message: 'Please select at least one vaccine to book'
    };
  }

  // Format date as expected by the API (YYYY-MM-DD)
  const formattedDate = selectedDate instanceof Date 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` 
    : selectedDate;
  
  // Extract time and meridiem (AM/PM)
  let timeValue = selectedTime;
  let meridiemValue = "AM";
  
  // Check if time includes meridiem indicator
  if (selectedTime.includes("AM") || selectedTime.includes("PM")) {
    const parts = selectedTime.split(" ");
    timeValue = parts[0];
    meridiemValue = parts[1];
  } else {
    // If time is in 24h format, convert to 12h + meridiem
    const hour = parseInt(selectedTime.split(":")[0], 10);
    if (hour >= 12) {
      meridiemValue = "PM";
      if (hour > 12) {
        timeValue = `${hour-12}:${selectedTime.split(":")[1]}`;
      }
    }
  }
  
  // Use the vaccine names for the API call
  const finalVaccineNames = vaccineNames || cartItems.map(item => item.name).join(',');
  
  // Check for userID, which is required for booking
  if (!userDetails.userID) {
    return {
      success: false,
      message: 'User ID is required for booking'
    };
  }
  
  // Build the request payload according to the API's expected format
  const payload = {
    bookingDate: formattedDate,
    vaccinesIDs: finalVaccineNames,
    meridiem: meridiemValue,
    slot: timeValue,
    userID: userDetails.userID, // Now using userID instead of clientID for booking
    pharmacyNo: PHARMACY_NO,
    name: userDetails.name,
    phoneNumber: userDetails.mobile,
    paymentMethod: userDetails.payment || "CARD"
  };

  console.log('Booking payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(`${API_BASE_URL}/book-slot-for-a-day`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'cors'
    });
    
    console.log('API Response status:', response.status);
    
    let responseData;
    try {
      responseData = await response.json();
      console.log('API Response data:', responseData);
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      return {
        success: false,
        message: 'Error processing response from server',
        data: null
      };
    }
    
    if (responseData?.responseStatus?.code === 1001) {
      return {
        success: true,
        message: responseData?.message || 'Booking confirmed',
        data: {
          bookingId: responseData.bookingId || responseData.bookingID,
          date: formattedDate,
          time: selectedTime,
          name: userDetails.name,
          phoneNumber: userDetails.mobile,
          vaccineName: finalVaccineNames
        }
      };
    } else if (responseData?.responseStatus?.code === 9998) {
      // Handle specific slot not available error
      return {
        success: false,
        message: responseData.responseStatus.message || 'Slot not available, please try another time.',
        slotUnavailable: true,
        data: null
      };
    } else {
      return {
        success: false,
        message: responseData?.responseStatus?.message || 'Failed to book appointment',
        data: null
      };
    }
  } catch (error) {
    console.error('Error in bookSlotForDay:', error);
    return {
      success: false,
      message: 'Error connecting to the server. Please try again later.',
      data: null
    };
  }
}

// Fetch slots for a particular date
export async function fetchSlotsForDay(date) {
  try {
    const response = await fetch('https://7n0wver1gl.execute-api.eu-west-2.amazonaws.com/dev/fetch-slot-of-a-day', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pharmacyNo: "PN1853278176",
        date: typeof date === "string" ? date : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      }),
    });

    const data = await response.json();
    console.log('Fetched slots:', data);

    if (data.responseStatus?.code === 1001) {
      return { 
        success: true, 
        data: data,
        slotList: data.slotList // Make sure this is included
      };
    } else {
      return { 
        success: false, 
        message: data.responseStatus?.message || "Failed to fetch slots" 
      };
    }
  } catch (error) {
    console.error('Error fetching slots:', error);
    return { 
      success: false, 
      message: 'Failed to fetch slots' 
    };
  }
}

export async function sendOTP(mobileNumber) {
  try {
    const response = await fetch(`${API_BASE_URL}/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNo: mobileNumber,
      }),
    });

    const responseData = await response.json();
    console.log('Send OTP API response:', responseData);

    if (responseData.responseStatus?.code === 1001) {
      return {
        success: true,
        message: 'OTP sent successfully.',
      };
    } else {
      return {
        success: false,
        message: responseData.responseStatus?.message || 'Failed to send OTP.',
      };
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: 'Error connecting to the server. Please try again later.',
    };
  }
}

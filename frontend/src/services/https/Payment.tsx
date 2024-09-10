import { PaymentFormData } from "@/validator";

const apiUrl = "http://localhost:8080";

async function CreatePayment(formData: PaymentFormData) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

    let res = await fetch(`${apiUrl}/payment/create`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }

  const GetDeliveryType = async () => {
    const requestOptions :RequestInit= {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
  
    };
  
    let res = await fetch(`${apiUrl}/payment/deliverytype`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  const GetPaymentType = async () => {
    const requestOptions :RequestInit= {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
  
    };
  
    let res = await fetch(`${apiUrl}/payment/paymenttype`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
 
  const GetAddressByUserId = async (userID: number) => {
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // To include cookies or other credentials
    };
  
    try {
      const response = await fetch(`${apiUrl}/user/${userID}/address`, requestOptions);
  
      // Check if the response is OK before parsing the JSON
      if (!response.ok) {
        // Handle HTTP errors (non-2xx status codes)
        const errorText = await response.text();
        console.error("Failed to fetch user address:", errorText);
        return false;
      }
  
      // Parse JSON response
      const res = await response.json();
  
      // Check if the response contains data
      if (res.data) {
        return res.data; // Return the address data
      } else {
        console.error("Address data not found in response:", res.message || "Unknown error");
        return false;
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("An error occurred while fetching user address:", error);
      return false;
    }
  };
  

  export { CreatePayment , GetDeliveryType, GetPaymentType, GetAddressByUserId}
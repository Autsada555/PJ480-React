import { Checkpayment} from "../../interfaces/index";

const apiUrl = "http://localhost:8080";

const GetAllCheckPayment = async () => {
    const requestOptions:RequestInit= {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/checkpayment`, requestOptions)
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
  
  async function UpdateCheckPayment(data: Checkpayment) {
    const requestOptions :RequestInit= {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/checkpayment/update`, requestOptions)
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
  export { GetAllCheckPayment, UpdateCheckPayment}
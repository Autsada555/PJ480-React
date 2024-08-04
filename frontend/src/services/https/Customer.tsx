import { Customer} from "../../interfaces/index";

const apiUrl = "http://localhost:8080";
//
const GetCustomer = async (id: number) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/customer/${id}`, requestOptions)
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

  async function UpdateCustomer(data: Customer) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/customer/edit`, requestOptions)
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

  async function DeleteCustomer(id: number | undefined) {
    const requestOptions = {
      method: "DELETE"
    };
    let res = await fetch(`${apiUrl}/customer/delete/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
  
        if (res.message) {
          return { status: true, message: res.message };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }
export { GetCustomer,  UpdateCustomer, DeleteCustomer }
import { Employee} from "../../interfaces/index";

const apiUrl = "http://localhost:8080";
//
const GetEmployee = async (id: number) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/employee/${id}`, requestOptions)
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

  async function UpdateEmployee(data: Employee) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/employee/edit`, requestOptions)
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

  async function DeleteEmployee(id: number | undefined) {
    const requestOptions = {
      method: "DELETE"
    };
    let res = await fetch(`${apiUrl}/employee/delete/${id}`, requestOptions)
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
export { GetEmployee,  UpdateEmployee, DeleteEmployee }
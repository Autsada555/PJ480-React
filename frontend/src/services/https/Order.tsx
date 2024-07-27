
import { Order} from "../../interfaces/index";
const apiUrl = "http://localhost:5173";

async function CreateOrder(data: Order) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/order/create`, requestOptions)
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

  async function DeleteOrder(id: number | undefined) {
    const requestOptions = {
      method: "DELETE"
    };
    let res = await fetch(`${apiUrl}/order/delete/${id}`, requestOptions)
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

  export { CreateOrder,DeleteOrder }
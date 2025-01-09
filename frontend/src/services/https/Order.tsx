
import { Order, CancelOrderData } from "../../interfaces/index";
const apiUrl = "http://localhost:8080";

async function CreateOrder(data: Order) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
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

async function CancelOrder(id: number) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };
  let res = await fetch(`${apiUrl}/order/cancel/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

const GetOrderByID = async (id: number) => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  let res = await fetch(`${apiUrl}/order/${id}`, requestOptions)
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

const GetAllOrder = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  let res = await fetch(`${apiUrl}/order`, requestOptions)
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

export { CreateOrder, CancelOrder, GetOrderByID, GetAllOrder }
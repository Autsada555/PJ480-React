
import { Order } from "../../interfaces/index";
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

async function ReceiveOrder(id: number,status_order_type_id: number) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };
  let res = await fetch(`${apiUrl}/order/${id}/${status_order_type_id}`, requestOptions)
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

async function CheckDeliveryOrder(id: number,status_delivery_type_id: number) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };
  let res = await fetch(`${apiUrl}/order/deliveryorder/${id}/${status_delivery_type_id}`, requestOptions)
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

async function DeliveryOrder(id: number) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };
  let res = await fetch(`${apiUrl}/order/deliveryorder/${id}`, requestOptions)
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

 const GetStatusDelivery = async () => {
    const requestOptions :RequestInit= {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
  
    };
  
    let res = await fetch(`${apiUrl}/statusdelivery`, requestOptions)
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

export { CreateOrder, CancelOrder, GetOrderByID, GetAllOrder, ReceiveOrder, DeliveryOrder, CheckDeliveryOrder, GetStatusDelivery}
import { UserFormData, UserUpdateFormData } from "@/validator";
// import { User} from "../../interfaces/index";

const apiUrl = "http://localhost:8080";

//
const GetAllCustomer = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  let res = await fetch(`${apiUrl}/customer`, requestOptions)
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

const GetCustomer = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  };

  let res = await fetch(`${apiUrl}/customer/`, requestOptions)
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

async function CreateCustomer(formData: UserFormData) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  let res = await fetch(`${apiUrl}/customer/create`, requestOptions)
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

async function UpdateCustomer(formData: UserUpdateFormData, id:number | undefined) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include"
  };

  let res = await fetch(`${apiUrl}/customer/edit/${id}`, requestOptions)
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
  const requestOptions: RequestInit = {
    method: "DELETE"
  };
  let res = await fetch(`${apiUrl}/customer/delete/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

const GetAllGender = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  let res = await fetch(`${apiUrl}/customer/gender`, requestOptions)
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

const GetAllUserType = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  let res = await fetch(`${apiUrl}/customer/usertype`, requestOptions)
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

const GetCustomerByID = async (id: number) => {
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

export { GetCustomer, UpdateCustomer, DeleteCustomer, GetAllCustomer, CreateCustomer, GetAllGender, GetAllUserType ,GetCustomerByID}
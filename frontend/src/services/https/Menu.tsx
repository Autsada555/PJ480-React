import { Menu} from "../../interfaces/index";

const apiUrl = "http://localhost:8080";
//
const GetAllMenu = async () => {
  const requestOptions :RequestInit= {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  let res = await fetch(`${apiUrl}/menu`, requestOptions)
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

const GetMenuByID = async (id: number) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menu/${id}`, requestOptions)
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


async function CreateMenu(data: Menu) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/menu/create`, requestOptions)
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


async function UpdateMenu(data: Menu) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/menu/update`, requestOptions)
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

async function DeleteMenu(id: number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };
  let res = await fetch(`${apiUrl}/menu/delete/${id}`, requestOptions)
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
export { GetAllMenu, GetMenuByID, CreateMenu, UpdateMenu, DeleteMenu }
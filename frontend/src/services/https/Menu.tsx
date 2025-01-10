import { CreateMenuInterface } from "@/interfaces";
// import { MenuFormData } from "@/validator";

const apiUrl = "http://localhost:8080";
//
const GetMenuByDisease = async (diseaseID: number) => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  const res = await fetch(`${apiUrl}/menu/${diseaseID}`, requestOptions)
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

const GetAllMenu = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  const res = await fetch(`${apiUrl}/menus`, requestOptions)
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

const GetMenuType = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

  };

  const res = await fetch(`${apiUrl}/menutypes`, requestOptions)
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

async function CreateMenu(data: CreateMenuInterface) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/menu/create`, requestOptions)
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


async function UpdateMenu(data: CreateMenuInterface, id: number) {
  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/menu/update/${id}`, requestOptions)
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

async function DeleteMenu(id: number) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    credentials: "include",
  };
  const res = await fetch(`${apiUrl}/menu/delete/${id}`, requestOptions)
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

const GetDiseases = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // เพื่อส่ง cookie ไปกับ request
  };

  try {
    // เรียก API สำหรับดึงข้อมูลทั้งหมด
    const response = await fetch(`${apiUrl}/disease`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();

    // ตรวจสอบข้อมูลที่ได้กลับมา
    if (res) {
      return res; // ส่งข้อมูลกลับเมื่อสำเร็จ
    } else {
      return []; // ส่ง array ว่างหากไม่มีข้อมูล
    }
  } catch (error) {
    console.error("Error fetching all disease data:", error);
    return []; // Return array ว่างเมื่อเกิด error
  }
};


export { GetAllMenu, GetMenuType, GetMenuByDisease, CreateMenu, UpdateMenu, DeleteMenu, GetDiseases }
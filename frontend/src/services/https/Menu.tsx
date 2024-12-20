import { MenuFormData } from "@/validator";
import { Menu} from "../../interfaces/index";

const apiUrl = "http://localhost:8080";
//
const GetAllMenu = async (id:number) => {
  const requestOptions :RequestInit= {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"

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

// const GetMenuByID = async (id: number) => {
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   let res = await fetch(`${apiUrl}/menu/${id}`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }


async function CreateMenu(data: MenuFormData) {
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
    let response = await fetch(`${apiUrl}/disease`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let res = await response.json();

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


export { GetAllMenu, CreateMenu, UpdateMenu, DeleteMenu, GetDiseases }
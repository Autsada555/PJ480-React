import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "../customer/navbar";
import { Plus } from "@phosphor-icons/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import { ChangeEvent, useEffect, useState } from "react";
import { GetDiseases, GetMenus } from "@/services/https/Menu";
import { Menu as MenuInterface } from "@/interfaces";

// interface Ingredient {
//   id: number;
//   name: string;
// }

interface Disease {
  ID: number;
  Name: string;
  Menus: unknown; // ถ้าคุณมีข้อมูลที่เกี่ยวข้องกับ Menus สามารถกำหนดได้ตรงนี้
}

interface FormData {
  menuName: string;
  price: string;
  description: string;
  ingredients: string[]; // เพิ่ม array ของวัตถุดิบ
  image?: string; // เพิ่มฟิลด์สำหรับรูปภาพ (Base64 หรือ URL)
  selectedDiseases: number[]; // เก็บอาร์เรย์ของ ID โรคที่ถูกเลือก
}

export function Management() {

  const [formData, setFormData] = useState<FormData>({
    menuName: "",
    price: "",
    description: "",
    ingredients: [],
    image: undefined, // ค่าเริ่มต้นเป็นว่าง
    selectedDiseases: [], // เริ่มต้นด้วยอาร์เรย์ว่าง
  });

  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [menus, setMenus] = useState<MenuInterface[]>([])

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await GetDiseases();
        setDiseases(response);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };
    const fetchMenus = async () => {
      try {
        const response = await GetMenus();
        setMenus(response);
      } catch (error) {
        console.error("Error fetching menus:", error)
      }
    }
    fetchDiseases();
    fetchMenus();
  }, []);

  useEffect(() => {
    console.log(menus)
  }, [menus])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "price") {
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    }
    else if (name === "menuName" || name === "description") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    else if (name.startsWith("ingredient-")) {
      // ตรวจจับฟิลด์วัตถุดิบจาก name เช่น "ingredient-0"
      const ingredientIndex = parseInt(name.split("-")[1], 10);
      setFormData((prevData) => {
        const newIngredients = [...prevData.ingredients];
        newIngredients[ingredientIndex] = value;
        return { ...prevData, ingredients: newIngredients };
      });
    }
  };
  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""], // เพิ่ม string ว่างในอาร์เรย์
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index), // ลบวัตถุดิบตาม index
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          image: event.target?.result as string, // เก็บรูปภาพในรูปแบบ Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (): void => {
    alert(`ค่าที่กรอก: ${JSON.stringify(formData)}`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row mt-[90px] space-y-5 md:space-y-0">
        <div className="bg-gray-300 w-full md:w-[250px] h-fit md:h-[800px] p-4 space-y-4">
          <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
            <a href="management" className="block text-center">
              จัดการเมนู
            </a>
          </button>
          <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
            <a href="checkpayment" className="block text-center">
              เช็คการจ่ายเงิน
            </a>
          </button>
          <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
            <a href="listuser" className="block text-center">
              รายชื่อผู้ใช้งาน
            </a>
          </button>
        </div>

        <div className="flex-1 p-5">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">จัดการเมนูอาหาร</h1>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-2 bg-green-500 rounded-full hover:bg-green-700">
                    <Plus size={24} color="white" />
                  </button>
                </DialogTrigger>

                <DialogContent className="w-[800px]">
                  <DialogHeader>
                    <DialogTitle>เพิ่มรายการเมนูอาหาร</DialogTitle>
                    <DialogDescription>
                      เพิ่มรายละเอียดของเมนูอาหาร
                    </DialogDescription>
                  </DialogHeader>

                  <div>

                    <div>
                      <label htmlFor="menuName" className="block text-sm font-medium text-gray-900">
                        ชื่อเมนู
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                          <input
                            id="menuName"
                            name="menuName"
                            type="text"
                            placeholder="ชื่อเมนู"
                            value={formData.menuName}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                        ราคา
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm">฿</div>
                          <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="0"
                            value={formData.price}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                        คําอธิบายอาหาร
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                          <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="คำอธิบายอาหาร"
                            value={formData.description}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="ingredients"
                        className="block text-sm font-medium text-gray-900"
                      >
                        วัตถุดิบ
                      </label>
                      <div className="mt-2">
                        {formData.ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="flex items-center mb-2 rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                          >
                            <input
                              type="text"
                              id={`ingredient-${index}`}
                              name={`ingredient-${index}`}
                              value={ingredient}
                              onChange={handleChange}
                              placeholder="ชื่อวัตถุดิบ"
                              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeIngredient(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ลบ
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addIngredient}
                          className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                        >
                          เพิ่มวัตถุดิบ
                        </button>
                      </div>
                    </div>


                    <div>
                      <label htmlFor="menuImage" className="block text-sm font-medium text-gray-900">
                        รูปภาพเมนู
                      </label>
                      <div className="mt-2">
                        <input
                          id="menuImage"
                          name="menuImage"
                          type="file"
                          accept="image/*"
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                          onChange={handleImageChange}
                        />
                      </div>
                      {formData.image && (
                        <div className="mt-3">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-md border border-gray-300"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900">โรคที่เกี่ยวข้อง</label>
                      <div className="mt-2">
                        {diseases.map((disease) => (
                          <div key={disease.ID} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`disease-${disease.ID}`}
                              name="selectedDiseases"
                              value={disease.ID}
                              checked={formData.selectedDiseases.includes(disease.ID)}
                              onChange={(e) => {
                                const newSelectedDiseases = e.target.checked
                                  ? [...formData.selectedDiseases, disease.ID]
                                  : formData.selectedDiseases.filter(id => id !== disease.ID);
                                setFormData((prevData) => ({
                                  ...prevData,
                                  selectedDiseases: newSelectedDiseases,
                                }));
                              }}
                              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor={`disease-${disease.ID}`} className="ml-2 text-sm text-gray-900">
                              {disease.Name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>



                    <div className="mt-6">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="overflow-x-auto">
          <Table className="border border-gray-300 w-full bg-gray-100">
  <TableCaption>รายการเมนูอาหารทั้งหมด</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="text-center text-black">เมนูที่</TableHead>
      <TableHead className="text-center text-black">รูปภาพอาหาร</TableHead>
      <TableHead className="text-center text-black">ชื่อเมนู</TableHead>
      <TableHead className="text-center text-black">ราคา</TableHead>
      <TableHead className="text-center text-black">คำอธิบายอาหาร</TableHead>
      <TableHead className="text-center hidden md:table-cell text-black">วัตถุดิบ</TableHead>
      <TableHead className="text-center hidden md:table-cell text-black">ประเภทของอาหาร</TableHead>
      <TableHead className="text-center text-black">แก้ไขหรือลบ</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {menus.map((menu, index) => (
      <TableRow key={menu.ID} className="hover:bg-gray-200">
        <td className="text-center border px-4 py-2">{index + 1}</td>
        <td className="text-center border px-4 py-2">
          <img src={menu.MenuImage} alt={menu.Name} className="w-20 h-20 object-cover mx-auto" />
        </td>
        <td className="text-center border px-4 py-2">{menu.Name}</td>
        <td className="text-center border px-4 py-2">{menu.Cost} บาท</td>
        <td className="text-center border px-4 py-2">{menu.Description}</td>
        <td className="text-center border px-4 py-2 hidden md:table-cell">
          {menu.Component.join(", ")}
        </td>
        <td className="text-center border px-4 py-2 hidden md:table-cell">
          {menu.Diseases?.map((disease:Disease) => disease.Name).join(", ")}
        </td>
        <td className="text-center border px-4 py-2">
          <button className="px-3 py-1 text-white bg-blue-500 rounded">แก้ไข</button>
          <button className="ml-2 px-3 py-1 text-white bg-red-500 rounded">ลบ</button>
        </td>
      </TableRow>
    ))}
  </TableBody>
</Table>

            {/* <Table className="border border-gray-300 w-full bg-gray-100">
              <TableCaption>รายการเมนูอาหารทั้งหมด</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-black">
                    เมนูที่
                  </TableHead>
                  <TableHead className="text-center text-black">
                    รูปภาพอาหาร
                  </TableHead>
                  <TableHead className="text-center text-black">
                    ชื่อเมนู
                  </TableHead>
                  <TableHead className="text-center text-black">ราคา</TableHead>
                  <TableHead className="text-center text-black">
                    คำอธิบายอาหาร
                  </TableHead>
                  <TableHead className="text-center hidden md:table-cell text-black">
                    วัตถุดิบ
                  </TableHead>
                  <TableHead className="text-center hidden md:table-cell text-black">
                    ประเภทของอาหาร
                  </TableHead>
                  <TableHead className="text-center text-black">
                    แก้ไขหรือลบ
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody></TableBody>
            </Table> */}
          </div>
        </div>
      </div>
    </div>
  );
}

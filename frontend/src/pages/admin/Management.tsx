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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import { ChangeEvent, useEffect, useState } from "react";
import { GetDiseases, GetAllMenu, GetMenuType, CreateMenu, UpdateMenu, DeleteMenu } from "@/services/https/Menu";
import { MenuInterface, CreateMenuInterface, DiseaseInterface, MenuTypeInterface } from "@/interfaces";
import { toast, ToastContainer } from "react-toastify";


export function Management() {

  const initialFormData = {
    Name: "",
    MenuTypeID: 1,
    Cost: 0,
    Description: "",
    Component: [],
    MenuImage: "",
    DiseasesID: [],
  };

  const [formData, setFormData] = useState<CreateMenuInterface>(initialFormData);
  const [formUpdateData, setFormUpdateData] = useState<CreateMenuInterface>(initialFormData);


  const [diseases, setDiseases] = useState<DiseaseInterface[]>([]);
  const [menus, setMenus] = useState<MenuInterface[]>([])
  const [menuTypes, setMenuTypes] = useState<MenuTypeInterface[]>([])

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
      const response = await GetAllMenu();
      setMenus(response);
    } catch (error) {
      console.error("Error fetching menus:", error)
    }
  }
  const fetchMenuType = async () => {
    try {
      const response = await GetMenuType();
      setMenuTypes(response);
    } catch (error) {
      console.error("Error fetching menu types:", error)
    }
  }

  useEffect(() => {
    fetchDiseases();
    fetchMenus();
    fetchMenuType();
  }, []);

  // useEffect(() => {
  //   console.log(menus)
  //   console.log(menuTypes)
  // }, [menus, menuTypes])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target);

    const { name, value } = e.target;
    if (name === "Cost") {
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
      }
    }
    else if (name === "Name" || name === "Description") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    else if (name.startsWith("component-")) {
      // ตรวจจับฟิลด์วัตถุดิบจาก name เช่น "component-0"
      const componentIndex = parseInt(name.split("-")[1], 10);
      setFormData((prevData) => {
        const newComponent = [...prevData.Component];
        newComponent[componentIndex] = value;
        return { ...prevData, Component: newComponent };
      });
    }
  };
  const addComponent = () => {
    setFormData((prev) => ({
      ...prev,
      Component: [...prev.Component, ""], // เพิ่ม string ว่างในอาร์เรย์
    }));
  };

  const removeComponent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      Component: prev.Component.filter((_, i) => i !== index), // ลบวัตถุดิบตาม index
    }));
  };

  const handleMenuImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          MenuImage: event.target?.result as string, // เก็บรูปภาพในรูปแบบ Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async () => {
    // alert(`ค่าที่กรอก: ${JSON.stringify(formData)}`);
    try {
      await CreateMenu(formData);
      toast.success("สร้างเมนูสําเร็จ", {
        position: "bottom-right",
        autoClose: 2000,
      })
      setFormData(initialFormData);
      fetchMenus();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการสร้างเมนู", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleUpdateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target);

    const { name, value } = e.target;
    if (name === "Cost") {
      if (/^\d*\.?\d*$/.test(value)) {
        setFormUpdateData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
      }
    }
    else if (name === "Name" || name === "Description") {
      setFormUpdateData((prevData) => ({ ...prevData, [name]: value }));
    }
    else if (name.startsWith("component-")) {
      // ตรวจจับฟิลด์วัตถุดิบจาก name เช่น "component-0"
      const componentIndex = parseInt(name.split("-")[1], 10);
      setFormUpdateData((prevData) => {
        const newComponent = [...prevData.Component];
        newComponent[componentIndex] = value;
        return { ...prevData, Component: newComponent };
      });
    }
  };

  const addUpdateComponent = () => {
    setFormUpdateData((prev) => ({
      ...prev,
      Component: [...prev.Component, ""], // เพิ่ม string ว่างในอาร์เรย์
    }));
  };

  const removeUpdateComponent = (index: number) => {
    setFormUpdateData((prev) => ({
      ...prev,
      Component: prev.Component.filter((_, i) => i !== index), // ลบวัตถุดิบตาม index
    }));
  };

  const handleUpdateMenuImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormUpdateData((prevData) => ({
          ...prevData,
          MenuImage: event.target?.result as string, // เก็บรูปภาพในรูปแบบ Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      // ส่งข้อมูลที่มีการแก้ไขไปยัง API
      await UpdateMenu(formUpdateData, id); // ฟังก์ชัน UpdateMenu ใช้สำหรับส่งคำขอแก้ไข
      toast.success("แก้ไขเมนูสำเร็จ", {
        position: "bottom-right",
        autoClose: 2000,
      });

      // รีเซ็ตฟอร์มหลังจากการแก้ไขสำเร็จ
      setFormData(initialFormData);

      // รีเฟรชข้อมูลเมนูหลังจากแก้ไข
      fetchMenus();
    } catch (error) {
      console.error("Error editing menu:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขเมนู", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await DeleteMenu(id);
      toast.success("ลบเมนูสําเร็จ", {
        position: "bottom-right",
        autoClose: 2000,
      })
      fetchMenus();
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
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
                      สามาาถเพิ่มรายละเอียดของเมนูอาหารได้ที่นี่
                    </DialogDescription>
                  </DialogHeader>
                  <div>

                    <div>
                      <label htmlFor="Name" className="block text-sm font-medium text-gray-900">
                        ชื่อเมนู
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                          <input
                            id="Name"
                            name="Name"
                            type="text"
                            placeholder="ชื่อเมนู"
                            value={formData.Name}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="MenuTypeID" className="block text-sm font-medium text-gray-900">
                        ประเภทเมนู
                      </label>
                      <div className="mt-2">
                        <div
                          className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[select:focus-within]:outline has-[select:focus-within]:outline-2 has-[select:focus-within]:-outline-offset-2 has-[select:focus-within]:outline-indigo-600"
                        >
                          <select
                            id="MenuTypeID"
                            name="MenuTypeID"
                            value={formData.MenuTypeID}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                            onChange={(e) => {
                              const { name, value } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                [name]: parseInt(value, 10), // แปลงค่าที่ได้เป็น number
                              }));
                            }}
                          >
                            <option value="" disabled>
                              เลือกประเภทเมนู
                            </option>
                            {menuTypes.map((menuType) => (
                              <option key={menuType.ID} value={menuType.ID}>
                                {menuType.Name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>


                    <div>
                      <label htmlFor="Cost" className="block text-sm font-medium text-gray-900">
                        ราคา
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm">฿</div>
                          <input
                            id="Cost"
                            name="Cost"
                            type="text"
                            placeholder="0"
                            value={formData.Cost}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="Description" className="block text-sm font-medium text-gray-900">
                        คําอธิบายอาหาร
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                          <input
                            id="Description"
                            name="Description"
                            type="text"
                            placeholder="คำอธิบายอาหาร"
                            value={formData.Description}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="Component"
                        className="block text-sm font-medium text-gray-900"
                      >
                        วัตถุดิบ
                      </label>
                      <div className="mt-2">
                        {formData.Component.map((component, index) => (
                          <div
                            key={index}
                            className="flex items-center mb-2 rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                          >
                            <input
                              type="text"
                              id={`component-${index}`}
                              name={`component-${index}`}
                              value={component}
                              onChange={handleChange}
                              placeholder="ชื่อวัตถุดิบ"
                              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeComponent(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ลบ
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addComponent}
                          className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                        >
                          เพิ่มวัตถุดิบ
                        </button>
                      </div>
                    </div>


                    <div>
                      <label htmlFor="MenuImage" className="block text-sm font-medium text-gray-900">
                        รูปภาพเมนู
                      </label>
                      <div className="mt-2">
                        <input
                          id="MenuImage"
                          name="MenuImage"
                          type="file"
                          accept="MenuImage/*"
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                          onChange={handleMenuImageChange}
                        />
                      </div>
                      {formData.MenuImage && (
                        <div className="mt-3">
                          <img
                            src={formData.MenuImage}
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
                              name="DiseasesID"
                              value={disease.ID}
                              checked={formData.DiseasesID?.includes(disease.ID) || false} // ตรวจสอบว่าค่า disease.ID อยู่ใน DiseasesID หรือไม่
                              onChange={(e) => {
                                const newDiseasesID = e.target.checked
                                  ? [...(formData.DiseasesID || []), disease.ID] // เพิ่ม disease.ID
                                  : formData.DiseasesID?.filter((id) => id !== disease.ID); // ลบ disease.ID
                                setFormData((prevData) => ({
                                  ...prevData,
                                  DiseasesID: newDiseasesID,
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
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <button className="px-3 py-1 text-white bg-gray-500 rounded">ยกเลิก</button>
                    </DialogClose>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                      onClick={() => handleSubmit()}
                    >
                      บันทึก
                    </button>
                  </DialogFooter>

                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="border border-gray-300 w-full bg-gray-100">
              <TableCaption>รายการเมนูอาหารทั้งหมด</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-black font-bold">เมนูที่</TableHead>
                  <TableHead className="text-center text-black font-bold">รูปภาพอาหาร</TableHead>
                  <TableHead className="text-center text-black font-bold">ชื่อเมนู</TableHead>
                  <TableHead className="text-center text-black font-bold">ประเภทอาหาร</TableHead>
                  <TableHead className="text-center text-black font-bold">ราคา</TableHead>
                  <TableHead className="text-center text-black font-bold">คำอธิบายอาหาร</TableHead>
                  <TableHead className="text-center hidden md:table-cell text-black font-bold">วัตถุดิบ</TableHead>
                  <TableHead className="text-center hidden md:table-cell text-black font-bold">เหมาะกับโรค</TableHead>
                  <TableHead className="text-center text-black font-bold">แก้ไขหรือลบ</TableHead>
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
                    <td className="text-center border px-4 py-2">{menu.MenuType?.Name}</td>
                    <td className="text-center border px-4 py-2">{menu.Cost} บาท</td>
                    <td className="text-center border px-4 py-2">{menu.Description}</td>
                    <td className="text-center border px-4 py-2 hidden md:table-cell">
                      {menu.Component.join(", ")}
                    </td>
                    <td className="text-center border px-4 py-2 hidden md:table-cell">
                      {menu.Diseases?.map((disease: DiseaseInterface) => disease.Name).join(", ")}
                    </td>
                    <td className="text-center border px-4 py-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="ml-2 px-3 py-1 text-white bg-yellow-500 rounded"
                            onClick={() => {
                              console.log(menu);
                              setFormUpdateData({
                                ...menu,
                                DiseasesID: menu.Diseases?.map((disease) => disease.ID) || [],
                              });

                              console.log(formUpdateData);


                            }}
                          >
                            แก้ไข
                          </button>
                        </DialogTrigger>

                        <DialogContent className="w-[800px]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">แก้ไขรายการเมนูอาหาร</DialogTitle>
                            <DialogDescription>
                              สามารถแก้ไขรายละเอียดของเมนูอาหารได้ที่นี่
                            </DialogDescription>
                          </DialogHeader>
                          <div>

                            <div>
                              <label htmlFor="Name" className="block text-sm font-medium text-gray-900">
                                ชื่อเมนู
                              </label>
                              <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                  <input
                                    id="Name"
                                    name="Name"
                                    type="text"
                                    placeholder="ชื่อเมนู"
                                    value={formUpdateData.Name}
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                                    onChange={handleUpdateChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label htmlFor="MenuTypeID" className="block text-sm font-medium text-gray-900">
                                ประเภทเมนู
                              </label>
                              <div className="mt-2">
                                <div
                                  className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[select:focus-within]:outline has-[select:focus-within]:outline-2 has-[select:focus-within]:-outline-offset-2 has-[select:focus-within]:outline-indigo-600"
                                >
                                  <select
                                    id="MenuTypeID"
                                    name="MenuTypeID"
                                    value={formUpdateData.MenuTypeID}
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                                    onChange={(e) => {
                                      const { name, value } = e.target;
                                      setFormUpdateData((prevData) => ({
                                        ...prevData,
                                        [name]: parseInt(value, 10), // แปลงค่าที่ได้เป็น number
                                      }));
                                    }}
                                  >
                                    <option value="" disabled>
                                      เลือกประเภทเมนู
                                    </option>
                                    {menuTypes.map((menuType) => (
                                      <option key={menuType.ID} value={menuType.ID}>
                                        {menuType.Name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>


                            <div>
                              <label htmlFor="Cost" className="block text-sm font-medium text-gray-900">
                                ราคา
                              </label>
                              <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                  <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm">฿</div>
                                  <input
                                    id="Cost"
                                    name="Cost"
                                    type="text"
                                    placeholder="0"
                                    value={formUpdateData.Cost}
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                                    onChange={handleUpdateChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <label htmlFor="Description" className="block text-sm font-medium text-gray-900">
                                คําอธิบายอาหาร
                              </label>
                              <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                  <input
                                    id="Description"
                                    name="Description"
                                    type="text"
                                    placeholder="คำอธิบายอาหาร"
                                    value={formUpdateData.Description}
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                                    onChange={handleUpdateChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="Component"
                                className="block text-sm font-medium text-gray-900"
                              >
                                วัตถุดิบ
                              </label>
                              <div className="mt-2">
                                {formUpdateData.Component.map((component, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center mb-2 rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                                  >
                                    <input
                                      type="text"
                                      id={`component-${index}`}
                                      name={`component-${index}`}
                                      value={component}
                                      onChange={handleUpdateChange}
                                      placeholder="ชื่อวัตถุดิบ"
                                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeUpdateComponent(index)}
                                      className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                      ลบ
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={addUpdateComponent}
                                  className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                                >
                                  เพิ่มวัตถุดิบ
                                </button>
                              </div>
                            </div>


                            <div>
                              <label htmlFor="MenuImage" className="block text-sm font-medium text-gray-900">
                                รูปภาพเมนู
                              </label>
                              <div className="mt-2">
                                <input
                                  id="MenuImage"
                                  name="MenuImage"
                                  type="file"
                                  accept="MenuImage/*"
                                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                  onChange={handleUpdateMenuImageChange}
                                />
                              </div>
                              {formUpdateData.MenuImage && (
                                <div className="mt-3">
                                  <img
                                    src={formUpdateData.MenuImage}
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
                                      name="DiseasesID"
                                      value={disease.ID}
                                      checked={formUpdateData.DiseasesID?.includes(disease.ID) || false} // ตรวจสอบว่าค่า disease.ID อยู่ใน DiseasesID หรือไม่
                                      onChange={(e) => {
                                        const newDiseasesID = e.target.checked
                                          ? [...(formUpdateData.DiseasesID || []), disease.ID] // เพิ่ม disease.ID
                                          : formUpdateData.DiseasesID?.filter((id) => id !== disease.ID); // ลบ disease.ID
                                        setFormUpdateData((prevData) => ({
                                          ...prevData,
                                          DiseasesID: newDiseasesID,
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
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <button className="px-3 py-1 text-white bg-gray-500 rounded">ยกเลิก</button>
                            </DialogClose>
                            <button
                              type="button"
                              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                              onClick={() => handleUpdate(menu.ID)}
                            >
                              บันทึก
                            </button>
                          </DialogFooter>

                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="ml-2 px-3 py-1 text-white bg-red-500 rounded">
                            ลบ
                          </button>
                        </DialogTrigger>

                        <DialogContent className="w-[800px]">
                          <DialogHeader>
                            <DialogTitle>คุณต้องการที่จะลบเมนูนี้ใช่ไหม?</DialogTitle>
                            <DialogDescription>
                              ข้อมูลของเมนูจะถูกลบทั้งหมด
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <button className="px-3 py-1 text-white bg-gray-500 rounded">ยกเลิก</button>
                            </DialogClose>
                            <button
                              className="px-3 py-1 text-white bg-red-500 rounded"
                              onClick={() => handleDelete(menu.ID)}  // เรียกใช้ฟังก์ชันลบ
                            >
                              ลบ
                            </button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>
    </div>
  );
}

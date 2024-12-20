import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CreateMenu, GetDiseases } from "../../services/https/Menu";
import { DiseaseInterface } from "../../interfaces";
import { Menu } from "@/interfaces";
import { menuFormSchema, MenuFormData } from "@/validator";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles

export function Management() {
  const [formData, setFormData] = useState<Menu>({
    Name: "",
    Cost: 0,
    Description: "",
    Component: [],
    MenuImage: "",
    MenuTypeID: 0,
    DiseaseTypeID: [],
  });

  const form = useForm<MenuFormData>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      Name: "",
      Cost: 0, // ค่าเริ่มต้นเป็น 0 สำหรับราคาที่ไม่ติดลบ
      Description: "",
      Image: "",
      Component: [],
      DiseaseID: [], // ค่าเริ่มต้นเป็น array ว่าง
      MenuTypeID: undefined, // undefined สำหรับ dropdown หรือ select
    },
  });

  const [open, setOpen] = useState(false);
  const [diseases, setDiseases] = useState<DiseaseInterface[]>([]);
  const [selectedDiseases, setSelectedDiseases] = useState<number[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleDiseaseChange = (disease: number) => {
    setSelectedDiseases(
      (prev: number[]) =>
        prev.includes(disease)
          ? prev.filter((d: number) => d !== disease) // เอาออกถ้าเลือกแล้ว
          : [...prev, disease] // เพิ่มถ้ายังไม่ได้เลือก
    );
  };

  useEffect(() => {
    const getDiseases = async () => {
      try {
        const res = await GetDiseases();
        setDiseases(res);
      } catch (error) {
        console.log(error);
      }
    };
    getDiseases();
  }, []);

  useEffect(() => {
    console.log(diseases);
  }, [diseases]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  // const handleSave = () => {
  //   // Add logic to save the form data
  //   console.log("Saved data:", {
  //     selectedDiseases,
  //     image,
  //   });
  // };

  const handleComponentChange = (index: number, value: string) => {
    const newComponents = [...formData.Component];
    newComponents[index] = value;
    setFormData((prev) => ({
      ...prev,
      Component: newComponents,
    }));
  };

  const addComponent = () => {
    setFormData((prev) => ({
      ...prev,
      Component: [...prev.Component, ""], // เพิ่มค่าใหม่ที่ว่างเปล่า
    }));
  };

  const removeComponent = (index: number) => {
    const newComponents = formData.Component.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      Component: newComponents,
    }));
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onSubmit: SubmitHandler<MenuFormData> = async (data: MenuFormData) => {
  console.log("Form submitted:", data);

  try {
    // แปลงไฟล์เป็น Base64 (หากมีรูปภาพ)
    let imageBase64 = "";
    if (image) {
      imageBase64 = await convertImageToBase64(image);
    }

    // เตรียมข้อมูลที่จะส่งไปยัง API
    const payload = {
      ...data, // ข้อมูลที่ได้จากฟอร์ม
      Image: imageBase64, // รูปภาพในรูปแบบ Base64
      DiseaseID: selectedDiseases, // ส่ง DiseaseID ที่เลือก
    };
    console.log("Payload to be sent:", payload);

    const res = await CreateMenu(payload);

    if (res.status) {
      toast.success("Menu created successfully", {
        position: "bottom-right",
        autoClose: 1500,
      });
      setOpen(false); // ปิด pop-up หลังจากสร้างเสร็จ
    } else {
      toast.error(`Creation Failed: ${res.message}`, { // ใช้ backticks
        position: "bottom-right",
        autoClose: 1500,
      });
    }
  } catch (error) {
    console.error("Error during menu creation:", error); // Log ข้อผิดพลาด
    toast.error("An error occurred while creating the menu.", {
      position: "bottom-right",
      autoClose: 1500,
    });
  }
};

  // const onSubmit = (data: MenuFormData) => {
  //   console.log("Form submitted:", { ...data, Image: image });
  // };

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
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="left-[27px]">
                        ชื่อเมนู
                      </label>
                      <input
                        id="name"
                        placeholder="ชื่อเมนู"
                        className="text-[16px] w-full"
                        {...form.register("Name")} // เชื่อมโยงกับฟอร์ม
                      />
                      {form.formState.errors.Name && (
                        <span className="text-red-500">
                          {form.formState.errors.Name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cost" className="left-[27px]">
                        ราคา
                      </label>
                      <input
                        id="cost"
                        placeholder="ราคา"
                        className="text-[16px] w-full"
                        // type="number"
                        {...form.register("Cost", { valueAsNumber: true })} // เชื่อมโยงกับฟอร์ม
                      />
                      {form.formState.errors.Cost && (
                        <span className="text-red-500">
                          {form.formState.errors.Cost.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="description" className="left-[27px]">
                        คำอธิบายอาหาร
                      </label>
                      <input
                        id="description"
                        placeholder="คำอธิบายอาหาร"
                        className="text-[16px] w-full"
                        {...form.register("Description")} // เชื่อมโยงกับฟอร์ม
                      />
                      {form.formState.errors.Description && (
                        <span className="text-red-500">
                          {form.formState.errors.Description.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label>วัตถุดิบ:</label>
                      {formData.Component.map((component, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            placeholder={`Component ${index + 1}`}
                            value={component}
                            onChange={(e) =>
                              handleComponentChange(index, e.target.value)
                            }
                            className="text-[16px] flex-1 mr-2 mt-3"
                          />
                          <button
                            type="button"
                            onClick={() => removeComponent(index)}
                            className="text-red-500"
                          >
                            ลบ
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addComponent}
                        className="text-blue-500 mt-2"
                      >
                        เพิ่มวัตถุดิบ
                      </button>
                    </div>

                    <div>
                      <label htmlFor="image" className="left-[27px]">
                        รูปภาพเมนู
                      </label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex flex-wrap items-center space-x-4 justify-center">
                      {diseases.map((disease) => (
                        <div
                          key={disease.ID}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={disease.ID.toString()}
                            className="cursor-pointer"
                            checked={selectedDiseases.includes(disease.ID)}
                            onChange={() => handleDiseaseChange(disease.ID)}
                          />
                          <label
                            htmlFor={disease.ID.toString()}
                            className="text-[17px] font-medium cursor-pointer"
                          >
                            {disease.Name}
                          </label>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      บันทึกเมนู
                    </button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="border border-gray-300 w-full bg-gray-100">
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
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

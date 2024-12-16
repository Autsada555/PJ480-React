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
import { useState } from "react";
import { CreateMenu } from "../../services/https/Menu";
import { Disease } from "../../interfaces";
import { Menu} from "@/interfaces";
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

  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleDiseaseChange = (disease: string) => {
    setSelectedDiseases(
      (prev) =>
        prev.includes(disease)
          ? prev.filter((d) => d !== disease) // เอาออกถ้าเลือกแล้ว
          : [...prev, disease] // เพิ่มถ้ายังไม่ได้เลือก
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const handleSave = () => {
    // Add logic to save the form data
    console.log("Saved data:", {
      selectedDiseases,
      image,
    });
  };

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

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="left-[27px]">
                        ชื่อเมนู
                      </Label>
                      <Input
                        id="name"
                        placeholder="ชื่อเมนู"
                        className="text-[16px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cost" className="left-[27px]">
                        ราคา
                      </Label>
                      <Input
                        id="cost"
                        placeholder="ราคา"
                        className="text-[16px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="left-[27px]">
                        คำอธิบายอาหาร
                      </Label>
                      <Input
                        id="description"
                        placeholder="คำอธิบายอาหาร"
                        className="text-[16px]"
                      />
                    </div>

                    <div>
                  <label>วัตถุดิบ : </label>
                  {formData.Component.map((component, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        placeholder={`Component ${index + 1}`}
                        value={component}
                        onChange={(e) =>
                          handleComponentChange(index, e.target.value)
                        }
                        className="text-[16px] flex-1 mr-2 mt-3 "
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
                      <Label htmlFor="image" className="left-[27px]">
                        รูปภาพเมนู  &nbsp;
                      </Label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex flex-wrap items-center space-x-4 justify-center">
                      {[
                        "อาหารเพื่อสุขภาพ",
                        "โรคเบาหวาน",
                        "โรคกระเพาะอาหาร",
                        "โรคไทรอยด์",
                        "โรคไต",
                      ].map((disease) => (
                        <div
                          key={disease}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={disease}
                            className="cursor-pointer"
                            checked={selectedDiseases.includes(disease)}
                            onChange={() => handleDiseaseChange(disease)}
                          />
                          <label
                            htmlFor={disease}
                            className="text-[17px] font-medium cursor-pointer"
                          >
                            {disease}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                      >
                        บันทึก
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

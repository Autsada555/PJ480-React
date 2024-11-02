// import DSLOGO from '@/assets/DS-Logo.png';
// import { CustomerCreate } from '@/components/ui/CustomerCreate';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"
// import { userFormSchema, UserFormData } from "@/validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Gender, } from "../../interfaces";
import { useEffect, useState } from "react";
import {
  GetAllGender,
  CreateCustomer,
} from "../../services/https/Customer";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export function Register() {
  const [gender, setGender] = useState<Gender[]>([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    district: '',
    province: '',
    postcode: '',
    genderid: 0,
    userTypeid: 0
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'genderid' ? Number(value) : value,
    }));
  };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // สร้างอ็อบเจ็กต์ใหม่ที่ตรงตามประเภทที่คาดหวัง
      const customerData = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Password: formData.password,
        Phone: formData.phone,
        UserName: formData.userName,
        Address: formData.address,
        District: formData.district,
        Province: formData.province,
        Postcode: formData.postcode,
        GenderID: 1, // แปลงค่า gender เป็นหมายเลข
        UserTypeID: 100 // สมมติว่าคุณมี UserTypeID สำหรับลูกค้าเป็น 1
      };

      const res = await CreateCustomer(customerData);
      console.log("Customer creation response:", res);

      if (res.status) {
        toast.success("Customer created successfully", {
          position: "bottom-right",
          autoClose: 1500,
        });
      } else {
        toast.error(`Creation Failed: ${res.message}`, {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error("Error during customer creation:", error);
      toast.error("An error occurred while creating the customer.", {
        autoClose: 1500,
      });
    }
  };


  useEffect(() => {
    async function fetchGender() {
      try {
        const res = await GetAllGender();
        console.log("Gender data:", res);
        if (res) {
          setGender(res);
        } else {
          console.error("Failed to fetch gender options:", res.message);
        }
      } catch (error) {
        console.error("Error fetching gender options:", error);
      }
    }
    fetchGender();
  }, []);


  // const form = useForm<UserFormData>({
  //   resolver: zodResolver(userFormSchema),
  //   defaultValues: {
  //     FirstName: "",
  //     LastName: "",
  //     GenderID: undefined,
  //     UserTypeID: undefined,
  //     Phone: "",
  //     Email: "",
  //     UserName: "",
  //     Password: "",
  //     Address: "",
  //     District: "",
  //     Province: "",
  //     Postcode: "",
  //   },
  // });

  return (
    <div className="flex justify-center mt-12">
      <div className="w-full md:w-1/2 p-4 bg-white shadow-md rounded">
        <h2 className="text-lg font-bold mb-4">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          {/* ฟิลด์อื่นๆ */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="district" className="block">District</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="province" className="block">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postcode" className="block">Postcode</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

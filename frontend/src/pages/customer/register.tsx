
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import {
  CreateCustomer,
} from "../../services/https/Customer";
import DSLOGO from '@/assets/DS-Logo.png';



export function Register() {

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
        GenderID: 1,
        UserTypeID: 100
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

  return (
    <>
      <div className="bg-[#01BD63] h-14"></div>

          <div className=" flex justify-center h-24 my-5">
            <img src={DSLOGO} alt="dslogo" className="" />

          </div>
      <div className="flex justify-center mt-5">
        <div className="flex flex-col bg-slate-100 w-[384px] content-center rounded-sm p-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <h2 className="text-[20px] font-bold mb-4">Register</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="userName" className="block font-semibold">Username</label>
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



            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Register
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
